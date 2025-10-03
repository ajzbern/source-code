"use client";

import { useState, useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import { useEditor, EditorContent } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListIcon,
  ListOrderedIcon,
  CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RichTextEditorProps {
  initialContent?: string;
  onSave: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  initialContent = "",
  onSave,
  placeholder = "Start writing your document content here...",
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState<string>("edit");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Bold,
      Italic,
      Underline,
      Code,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none p-4",
      },
    },
  });

  useEffect(() => {
    if (editor && initialContent && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div className="w-full border rounded-lg shadow-sm overflow-hidden">
      <div className="bg-muted p-2 border-b flex flex-wrap gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`${
            editor?.isActive("bold") ? "bg-muted-foreground/20" : ""
          }`}
        >
          <BoldIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`${
            editor?.isActive("italic") ? "bg-muted-foreground/20" : ""
          }`}
        >
          <ItalicIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`${
            editor?.isActive("underline") ? "bg-muted-foreground/20" : ""
          }`}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`${
            editor?.isActive("heading", { level: 1 })
              ? "bg-muted-foreground/20"
              : ""
          }`}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${
            editor?.isActive("heading", { level: 2 })
              ? "bg-muted-foreground/20"
              : ""
          }`}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`${
            editor?.isActive("heading", { level: 3 })
              ? "bg-muted-foreground/20"
              : ""
          }`}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`${
            editor?.isActive("bulletList") ? "bg-muted-foreground/20" : ""
          }`}
        >
          <ListIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`${
            editor?.isActive("orderedList") ? "bg-muted-foreground/20" : ""
          }`}
        >
          <ListOrderedIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleCode().run()}
          className={`${
            editor?.isActive("code") ? "bg-muted-foreground/20" : ""
          }`}
        >
          <CodeIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          className="ml-auto"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 m-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="p-0">
          <div className="min-h-[400px] bg-white">
            <EditorContent editor={editor} className="h-full" />
          </div>
        </TabsContent>

        <TabsContent value="preview" className="p-0">
          <div className="min-h-[400px] p-6 prose prose-sm sm:prose max-w-none bg-white overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
