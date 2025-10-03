"use client";
import { useEffect, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram = ({ chart }: MermaidDiagramProps) => {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "neutral",
      securityLevel: "loose",
      er: { useMaxWidth: false },
        flowchart: { useMaxWidth: false },
      suppressErrorRendering : true,
    });

    const fixSyntaxErrors = (mermaidCode: string) => {
      if (mermaidCode.includes("erDiagram")) {
        const lines = mermaidCode.split("\n");
        const fixedLines = lines.map((line) => {
          let fixedLine = line.replace(/\s+-+\^/g, ""); // Remove problematic arrows
          fixedLine = fixedLine.replace(/\[pk\]/g, ""); // Remove [pk] notation
          fixedLine = fixedLine.replace(/\(PK\)/g, "PK"); // Convert (PK) to PK
          const attributeRegex =
            /(\s*)([a-zA-Z0-9_]+)(\s+)([a-zA-Z0-9_]+)(\s+)(PK|pk|\[PK\]|\[pk\]|\(PK\)|\(pk\))/;
          const attributeMatch = fixedLine.match(attributeRegex);
          if (attributeMatch) {
            const [fullMatch, spacing, datatype, space1, fieldName] = attributeMatch;
            return `${spacing}${datatype}${space1}${fieldName} PK`;
          }
          return fixedLine;
        });
        return fixedLines.join("\n");
      }
      return mermaidCode;
    };

    const renderMermaid = async () => {
        if (!error) {
          try {
            const fixedMermaidCode = fixSyntaxErrors(chart);
            const { svg } = await mermaid.render(
              "mermaid-diagram-" + Math.random().toString(36).substr(2, 9),
              fixedMermaidCode
            );
            setSvg(svg);
            setError(null);
          } catch (err: any) {
            setError("Could not render diagram: " + err.message);
            setSvg(""); // Clear SVG to ensure no diagram is rendered
          }
      }
    };

    renderMermaid();
  }, [chart]);

  return (
    <div className="mermaid-container">
      {error ? (
        <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded">
          <p className="font-medium">Diagram Rendering Failed</p>
          <p className="text-sm mt-2">{error}</p>
          <details className="mt-4 text-xs border border-gray-200 rounded-md">
            <summary className="cursor-pointer p-2 bg-gray-50">
              View Original Diagram Source
            </summary>
            <pre className="p-3 overflow-x-auto whitespace-pre-wrap bg-gray-50 text-gray-700">
              {chart}
            </pre>
          </details>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      )}
    </div>
  );
};

export default MermaidDiagram;