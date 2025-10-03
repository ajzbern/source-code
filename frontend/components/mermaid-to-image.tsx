"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";

interface MermaidToImageProps {
  chart: string;
  backgroundColor?: string;
}

const MermaidToImage: React.FC<MermaidToImageProps> = ({
  chart,
  backgroundColor = "#ffffff",
}) => {
  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<string>(chart);

  useEffect(() => {
    const renderChart = async () => {
      if (!chart) {
        setError("No chart data provided");
        setLoading(false);
        return;
      }

      try {
        // Clean up the chart data to prevent lexical errors
        const cleanedChart = sanitizeMermaidSyntax(chart);
        chartRef.current = cleanedChart;

        // Initialize mermaid with safe settings
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
          logLevel: 1, // Set to 1 for production to minimize console noise
          fontFamily: "sans-serif",
          suppressErrorRendering: true,
          flowchart: {
            htmlLabels: true,
            useMaxWidth: true,
          },
          er: {
            useMaxWidth: true,
          },
          sequence: {
            useMaxWidth: true,
          },
        });

        // Generate a safe ID without special characters
        const safeId = `mermaid-${Date.now().toString()}`;

        // Render the chart
        const { svg } = await mermaid.render(safeId, cleanedChart);
        setSvgContent(svg);
        setError(null);
      } catch (err) {
        console.error("Mermaid rendering error:", err);

        // Handle specific error types
        if (err instanceof Error) {
          if (err.message.includes("Lexical error")) {
            setError(
              "Syntax error in diagram: Invalid characters or structure detected"
            );
          } else if (err.message.includes("Unrecognized")) {
            setError("Diagram contains unrecognized syntax");
          } else if (err.message.includes("Parse error")) {
            setError("Failed to parse diagram: Check diagram structure");
          } else {
            setError(`Failed to render diagram: ${err.message}`);
          }
        } else {
          setError("Failed to render diagram: Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    renderChart();
  }, [chart]);

  // Function to sanitize Mermaid syntax to prevent common errors
  const sanitizeMermaidSyntax = (input: string): string => {
    if (!input) return "";

    // Remove any BOM or invisible characters
    let cleaned = input.replace(/^\uFEFF/, "");

    // Replace problematic characters in labels
    cleaned = cleaned.replace(/["']/g, (match) => `\\${match}`);

    // Ensure proper line endings
    cleaned = cleaned.replace(/\r\n/g, "\n");

    // Fix common syntax issues with actors in sequence diagrams
    cleaned = cleaned.replace(
      /([Uu]ser|[Aa]ctor)(\s+)--(\s+)([^:]+)(?!:)/g,
      "$1$2-->$3$4"
    );

    return cleaned;
  };

  // Function to retry rendering with simplified diagram
  const handleRetry = () => {
    setLoading(true);
    setError(null);

    // Try to simplify the diagram by removing complex parts
    const simplifiedChart = simplifyDiagram(chartRef.current);

    // Re-render with simplified diagram
    setTimeout(() => {
      const container = containerRef.current;
      if (container) {
        try {
          mermaid.initialize({
            startOnLoad: false,
            theme: "default",
            securityLevel: "loose",
            logLevel: 1,
            suppressErrorRendering: true,
          });

          mermaid
            .render(`mermaid-retry-${Date.now()}`, simplifiedChart)
            .then(({ svg }) => {
              setSvgContent(svg);
              setError(null);
              setLoading(false);
            })
            .catch((err) => {
              console.error("Retry rendering failed:", err);
              setError("Failed to render even simplified diagram");
              setLoading(false);
            });
        } catch (err) {
          console.error("Retry initialization failed:", err);
          setError("Failed to initialize renderer");
          setLoading(false);
        }
      }
    }, 100);
  };

  // Function to simplify complex diagrams
  const simplifyDiagram = (input: string): string => {
    if (!input) return "";

    // Detect diagram type
    const isFlowchart = input.includes("flowchart") || input.includes("graph ");
    const isSequence = input.includes("sequenceDiagram");
    const isER = input.includes("erDiagram");
    const isClass = input.includes("classDiagram");

    let simplified = input;

    // Apply type-specific simplifications
    if (isFlowchart) {
      // Simplify flowchart by removing styling and complex shapes
      simplified = simplified.replace(/style\s+\w+\s+.*$/gm, "");
      simplified = simplified.replace(/\[\[(.*?)\]\]/g, "[$1]");
    } else if (isSequence) {
      // Remove notes and activations from sequence diagrams
      simplified = simplified.replace(/Note\s+(right|left|over).*$/gm, "");
      simplified = simplified.replace(/activate\s+.*$/gm, "");
      simplified = simplified.replace(/deactivate\s+.*$/gm, "");
    } else if (isER) {
      // Simplify ER diagrams by removing attributes
      simplified = simplified.replace(/\{.*?\}/g, "");
    } else if (isClass) {
      // Remove methods and attributes from class diagrams
      simplified = simplified.replace(/\+.*$/gm, "");
      simplified = simplified.replace(/-.*$/gm, "");
    }

    return simplified;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-md bg-muted/30">
        <div className="flex flex-col gap-2">
          <p className="text-destructive text-center font-medium">{error}</p>
          <div className="mt-2 p-2 bg-muted/50 rounded-md overflow-auto max-h-[200px]">
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
              {chart}
            </pre>
          </div>
          <button
            onClick={handleRetry}
            className="mt-2 px-4 py-2 bg-primary/80 hover:bg-primary text-primary-foreground rounded-md text-sm font-medium transition-colors"
          >
            Try Simplified Rendering
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram overflow-auto"
      style={{ backgroundColor }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default MermaidToImage;
