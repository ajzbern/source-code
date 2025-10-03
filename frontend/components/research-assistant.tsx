"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Loader2,
  Search,
  Bot,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Send,
  Sparkles,
  History,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Bookmark,
  Share2,
  Check,
  Mic,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { API_URL } from "@/app/lib/server-config";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { date } from "zod";

interface ResearchResponse {
  success: boolean;
  message: string;
  data: {
    results: {
      input: string;
      output: {
        kwargs: {
          content: string;
          usage_metadata?: {
            input_tokens: number;
            output_tokens: number;
            total_tokens: number;
          };
        };
      };
    };
    query: string;
  };
}

// Custom components for ReactMarkdown
const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "text";
  const codeString = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <code
        className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-200"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="group my-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition-all dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {language.toUpperCase()}
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-full p-0 text-slate-500 opacity-70 transition-opacity hover:bg-slate-100 hover:opacity-100 dark:text-slate-400 dark:hover:bg-slate-800"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-xs">
              <p>{copied ? "Copied!" : "Copy code"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="overflow-x-auto p-0">
        <SyntaxHighlighter
          language={language}
          style={theme === "dark" ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.9rem",
            lineHeight: "1.5",
          }}
          showLineNumbers={
            language !== "text" && codeString.split("\n").length > 1
          }
          wrapLongLines={false}
          codeTagProps={{
            className: "font-mono text-sm",
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default function ResearchAssistant({
  projectId,
}: {
  projectId: string;
}) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResearchResponse | null>(null);
  const [history, setHistory] = useState<{ query: string; timestamp: Date }[]>(
    []
  );
  const [savedResponses, setSavedResponses] = useState<ResearchResponse[]>([]);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const responseRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(true);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("researchHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse saved history", e);
      }
    }

    const savedBookmarks = localStorage.getItem("savedResponses");
    if (savedBookmarks) {
      try {
        setSavedResponses(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error("Failed to parse saved bookmarks", e);
      }
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("researchHistory", JSON.stringify(history));
    }
  }, [history]);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    if (savedResponses.length > 0) {
      localStorage.setItem("savedResponses", JSON.stringify(savedResponses));
    }
  }, [savedResponses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      toast({
        title: "Query required",
        description: "Please enter a question to research.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/projects/research`, {
        method: "POST",
        headers: {
          "x-api-key": "thisisasdca",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          projectDescription: query,
          adminId: localStorage.getItem("adminId"),
        }),
      });

      const data = await response.json();
      if (response.status === 400) {
        toast({
          title: "Somthing went wrong",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setResponse(data);

      setHistory((prev) => [
        { query, timestamp: new Date() },
        ...prev.slice(0, 9),
      ]);

      setTimeout(() => {
        responseRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Daily limit reached")) {
          toast({
            title: "Daily limit reached",
            description:
              "You have reached your daily limit for research requests. Please try again tomorrow. Or subscribe to pro plan for unlimited access.",
            variant: "destructive",
          });
        } else if (error.message.includes("Subscription is pending")) {
          toast({
            title: "Subscription pending",
            description:
              "Your subscription is pending. Please check your email for further instructions.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Research failed",
            description:
              "There was an error processing your request. Please try again.",
            variant: "destructive",
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (response?.data?.results?.output?.kwargs?.content) {
      navigator.clipboard.writeText(
        response.data.results.output.kwargs.content
      );
      toast({
        title: "Copied to clipboard",
        description: "The research response has been copied to your clipboard.",
      });
    }
  };

  const handleHistoryItemClick = (item: string) => {
    setQuery(item);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  const handleSaveResponse = () => {
    if (
      response &&
      !savedResponses.some((r) => r.data.query === response.data.query)
    ) {
      setSavedResponses((prev) => [response, ...prev]);
      toast({
        title: "Response saved",
        description: "This research response has been saved to your bookmarks.",
      });
    }
  };

  const exampleQuestions = [
    "What are the best practices for API security?",
    "How to implement CI/CD pipelines for a Next.js project?",
    "What is the difference between REST and GraphQL?",
    "How to optimize database queries for better performance?",
    "What are the SOLID principles in software development?",
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md dark:hover:shadow-slate-800/30">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mr-3 shadow-inner">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Ask an expert
                  </CardTitle>
                  <CardDescription>
                    Ask any question and get expert answers to help with your
                    project
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setExpanded(!expanded)}
                aria-label={expanded ? "Collapse" : "Expand"}
              >
                {expanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-0">
                  <form
                    onSubmit={handleSubmit}
                    className="p-4 border-b border-slate-200 dark:border-slate-800"
                  >
                    <div className="relative">
                      <Textarea
                        ref={textareaRef}
                        placeholder="Ask a question about anything..."
                        className="min-h-[100px] resize-y pr-12 text-base shadow-sm focus-visible:ring-blue-500"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={isLoading}
                        onKeyDown={handleKeyDown}
                      />
                      <div className="absolute bottom-3 right-3 flex space-x-1">
                        <Button
                          type="submit"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-md hover:from-blue-600 hover:to-violet-600"
                          disabled={isLoading || !query.trim()}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <span>Press Ctrl + Enter to submit</span>
                      <div className="flex-1"></div>
                      {query.length > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => setQuery("")}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </form>

                  <div className="p-0">
                    {isLoading ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-16"
                      >
                        <div className="relative">
                          <div className="h-16 w-16 rounded-full border-4 border-blue-100 dark:border-blue-900/30 flex items-center justify-center">
                            <div className="h-10 w-10 rounded-full border-t-2 border-blue-500 animate-spin"></div>
                          </div>
                          <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                            <Sparkles className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                          Researching your question...
                        </p>
                        <div className="mt-2 flex items-center space-x-1">
                          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                          <span
                            className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          ></span>
                          <span
                            className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          ></span>
                        </div>
                      </motion.div>
                    ) : response ? (
                      <motion.div
                        ref={responseRef}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                            >
                              Research Results
                            </Badge>
                            {response.data.results.output.kwargs
                              .usage_metadata && (
                              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                {
                                  response.data.results.output.kwargs
                                    .usage_metadata.total_tokens
                                }{" "}
                                tokens
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8"
                                >
                                  <Share2 className="mr-1 h-4 w-4" />
                                  Share
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={handleCopyToClipboard}
                                >
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy to clipboard
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8"
                                    onClick={handleSaveResponse}
                                  >
                                    <Bookmark className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="left">
                                  <p>Save response</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 shadow-sm transition-colors duration-200">
                          <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300">
                            <ReactMarkdown
                              components={{
                                code: CodeBlock,
                              }}
                            >
                              {response.data.results.output.kwargs.content}
                            </ReactMarkdown>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setResponse(null);
                              textareaRef.current?.focus();
                            }}
                            className="h-8"
                          >
                            <RefreshCw className="mr-1 h-4 w-4" />
                            New Research
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-12 px-6 text-center"
                      >
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/20 dark:to-violet-900/20 flex items-center justify-center mb-4">
                          <Bot className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Ask me anything
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mb-6">
                          I can help with technical questions, explain concepts,
                          provide code examples, and more.
                        </p>

                        <div className="w-full max-w-md grid grid-cols-1 gap-2">
                          {exampleQuestions.map((question, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Button
                                variant="outline"
                                className="justify-start text-left h-auto py-2 px-3 text-sm font-normal w-full border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                                onClick={() => {
                                  setQuery(question);
                                  textareaRef.current?.focus();
                                }}
                              >
                                <Search className="mr-2 h-4 w-4 text-blue-500 flex-shrink-0" />
                                <span className="truncate">{question}</span>
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="history" className="flex items-center">
              <History className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline lg:hidden xl:inline">
                History
              </span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center">
              <Bookmark className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline lg:hidden xl:inline">
                Saved
              </span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline lg:hidden xl:inline">Tips</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 hover:shadow-md dark:hover:shadow-slate-800/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Recent Searches
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  {history.length > 0 ? (
                    <div className="px-4 pb-4">
                      {history.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="py-2"
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-left text-sm font-normal h-auto py-2 group"
                            onClick={() => handleHistoryItemClick(item.query)}
                          >
                            <div className="mr-3 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 dark:bg-blue-900/30 dark:group-hover:bg-blue-900/50">
                              <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="truncate font-medium">
                                {item.query}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(item.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </Button>
                          {index < history.length - 1 && (
                            <Separator className="my-2" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 dark:bg-gray-800">
                        <History className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your search history will appear here
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Ask questions to build your research history
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 hover:shadow-md dark:hover:shadow-slate-800/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Saved Responses
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  {savedResponses.length > 0 ? (
                    <div className="px-4 pb-4">
                      {savedResponses.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="py-2"
                        >
                          <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              >
                                Saved Research
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => {
                                  setSavedResponses((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                              {item.data.query}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {item.data.results.output.kwargs.content.substring(
                                0,
                                100
                              )}
                              ...
                            </p>
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => {
                                  setQuery(item.data.query);
                                  setResponse(item);
                                }}
                              >
                                View Response
                              </Button>
                            </div>
                          </div>
                          {index < savedResponses.length - 1 && (
                            <Separator className="my-2" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 dark:bg-gray-800">
                        <Bookmark className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No saved responses yet
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Click the bookmark icon to save responses
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips">
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 hover:shadow-md dark:hover:shadow-slate-800/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Research Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 dark:border-blue-900/50 dark:from-blue-900/20 dark:to-blue-900/10">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mr-2">
                          <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-medium text-blue-800 dark:text-blue-300">
                          Be Specific
                        </h3>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Ask specific questions for more precise answers. Include
                        relevant context and details.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                        For Technical Questions
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 pl-6">
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Specify programming languages or frameworks
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Include version numbers when relevant</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Describe what you've already tried</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                        For Conceptual Questions
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 pl-6">
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Ask for comparisons between related concepts
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Request examples to illustrate abstract ideas
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Specify your level of familiarity with the topic
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                        Follow-up Questions
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 pl-6">
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Ask follow-up questions to dive deeper into a topic
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Request clarification on specific parts of the
                            answer
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Ask for practical applications of theoretical
                            concepts
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
