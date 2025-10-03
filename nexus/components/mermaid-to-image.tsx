"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"

interface MermaidToImageProps {
  chart: string
  backgroundColor?: string
}

const MermaidToImage: React.FC<MermaidToImageProps> = ({ chart, backgroundColor = "#ffffff" }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgString, setSvgString] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!chart) return

    const renderMermaid = async () => {
      try {
        mermaid.initialize({
          startOnLoad: true,
          theme: "default",
          securityLevel: "loose",
        })

        const { svg } = await mermaid.render("mermaid-diagram", chart)
        setSvgString(svg)

        // Convert SVG to image
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          console.error("Could not get canvas context")
          return
        }

        const img = new Image()
        img.crossOrigin = "anonymous"

        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height

          // Fill with background color
          ctx.fillStyle = backgroundColor
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Draw the SVG
          ctx.drawImage(img, 0, 0)

          // Convert to data URL
          // const dataUrl = canvas.toDataURL("image/png")
          // setImageUrl(dataUrl)
        }

        // Create a Blob from the SVG string
        const blob = new Blob([svg], { type: "image/svg+xml" })
        const url = URL.createObjectURL(blob)
        img.src = url
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error)
      }
    }

    renderMermaid()
  }, [chart, backgroundColor])

  return (
    <div ref={containerRef}>
      {svgString && <div dangerouslySetInnerHTML={{ __html: svgString }} />}
      {/* Hidden image for export purposes */}
      {imageUrl && (
        <img
          src={imageUrl || "/placeholder.svg"}
          alt="Mermaid Diagram"
          style={{ display: "none" }}
          id="mermaid-image"
        />
      )}
    </div>
  )
}

export default MermaidToImage

