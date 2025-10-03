// import {
//   Document,
//   Packer,
//   Paragraph,
//   TextRun,
//   HeadingLevel,
//   Table,
//   TableRow,
//   TableCell,
//   BorderStyle,
//   WidthType,
//   AlignmentType,
// } from "docx";
// import { saveAs } from "file-saver";

// interface Section {
//   section: string;
//   content: Array<{
//     subsection?: string;
//     content?:
//       | string
//       | Array<{
//           subsubsection?: string;
//           content: string;
//         }>;
//   }>;
// }

// interface DocumentData {
//   name: string;
//   description: string;
//   status: string;
//   body: string | null;
//   docBody?: string;
//   erDiagram?: string;
//   useCaseDiagram?: string;
//   createdBy: string;
//   createdAt: string;
//   updatedAt: string;
//   project: {
//     name: string;
//     description: string;
//     projectType: string;
//     complexity: string;
//     completionStatus: string;
//   };
// }

// export const exportToDocx = async (
//   docData: DocumentData,
//   parsedDocBody: Section[],
//   formatISODate: (date: string) => string
// ) => {
//   try {
//     const sections: (Paragraph | Table)[] = [];

//     // Add document title
//     sections.push(
//       new Paragraph({
//         text: docData.name,
//         heading: HeadingLevel.TITLE,
//         alignment: AlignmentType.CENTER,
//         spacing: { after: 200 },
//       })
//     );

//     // Add document description
//     sections.push(
//       new Paragraph({
//         text: docData.description,
//         style: "Normal",
//         spacing: { after: 200 },
//         alignment: AlignmentType.CENTER,
//       })
//     );

//     // Add project details table
   
//     sections.push(new Paragraph({ text: "", spacing: { after: 200 } }));

//     // Helper function to parse markdown and create TextRun children
//     const parseMarkdown = (text: string): TextRun[] => {
//       const children: TextRun[] = [];
//       let currentText = "";
//       let isBold = false;
//       let isItalic = false;

//       for (let i = 0; i < text.length; i++) {
//         if (
//           text.substring(i, i + 2) === "**" ||
//           text.substring(i, i + 2) === "__"
//         ) {
//           if (currentText) {
//             children.push(
//               new TextRun({
//                 text: currentText,
//                 bold: isBold,
//                 italics: isItalic,
//               })
//             );
//             currentText = "";
//           }
//           isBold = !isBold;
//           i++; // Skip the second character
//         } else if (text[i] === "*" || text[i] === "_") {
//           if (currentText) {
//             children.push(
//               new TextRun({
//                 text: currentText,
//                 bold: isBold,
//                 italics: isItalic,
//               })
//             );
//             currentText = "";
//           }
//           isItalic = !isItalic;
//         } else {
//           currentText += text[i];
//         }
//       }

//       if (currentText) {
//         children.push(
//           new TextRun({
//             text: currentText,
//             bold: isBold,
//             italics: isItalic,
//           })
//         );
//       }

//       return children;
//     };

//     // Add document content based on the structure
//     if (parsedDocBody.length > 0) {
//       // Process structured document
//       parsedDocBody.forEach((section) => {
//         // Add section heading
//         sections.push(
//           new Paragraph({
//             text: section.section,
//             heading: HeadingLevel.HEADING_1,
//             spacing: { before: 240, after: 120 },
//           })
//         );

//         // Process subsections
//         section.content.forEach((subsectionData) => {
//           if (subsectionData.subsection) {
//             sections.push(
//               new Paragraph({
//                 text: subsectionData.subsection,
//                 heading: HeadingLevel.HEADING_2,
//                 spacing: { before: 200, after: 80 },
//               })
//             );
//           }

//           // Process content
//           if (typeof subsectionData.content === "string") {
//             // Handle markdown in content
//             const contentLines = subsectionData.content.split("\n");
//             let inList = false;

//             contentLines.forEach((line) => {
//               if (line.trim()) {
//                 // Check for list items
//                 if (line.startsWith("- ") || line.startsWith("* ")) {
//                   inList = true;
//                   const listText = line.substring(2);
//                   const children = parseMarkdown(listText);
//                   sections.push(
//                     new Paragraph({
//                       children,
//                       bullet: { level: 0 },
//                     })
//                   );
//                 } else if (line.match(/^\d+\.\s/)) {
//                   // Numbered list
//                   inList = true;
//                   const textContent = line.replace(/^\d+\.\s/, "");
//                   const children = parseMarkdown(textContent);
//                   sections.push(
//                     new Paragraph({
//                       children,
//                       numbering: { reference: "default-numbering", level: 0 },
//                     })
//                   );
//                 } else {
//                   // Regular paragraph with markdown parsing
//                   if (inList) inList = false;
//                   const children = parseMarkdown(line);
//                   sections.push(new Paragraph({ children }));
//                 }
//               } else if (inList) {
//                 // Empty line after list
//                 inList = false;
//                 sections.push(new Paragraph({ text: "" }));
//               } else {
//                 // Empty line
//                 sections.push(new Paragraph({ text: "" }));
//               }
//             });
//           } else if (Array.isArray(subsectionData.content)) {
//             // Process subsubsections
//             subsectionData.content.forEach((subsubsection) => {
//               if (subsubsection.subsubsection) {
//                 sections.push(
//                   new Paragraph({
//                     text: subsubsection.subsubsection,
//                     heading: HeadingLevel.HEADING_3,
//                     spacing: { before: 160, after: 60 },
//                   })
//                 );
//               }

//               // Handle markdown in content
//               const contentLines = subsubsection.content.split("\n");
//               let inList = false;

//               contentLines.forEach((line) => {
//                 if (line.trim()) {
//                   // Check for list items
//                   if (line.startsWith("- ") || line.startsWith("* ")) {
//                     inList = true;
//                     const listText = line.substring(2);
//                     const children = parseMarkdown(listText);
//                     sections.push(
//                       new Paragraph({
//                         children,
//                         bullet: { level: 0 },
//                       })
//                     );
//                   } else if (line.match(/^\d+\.\s/)) {
//                     // Numbered list
//                     inList = true;
//                     const textContent = line.replace(/^\d+\.\s/, "");
//                     const children = parseMarkdown(textContent);
//                     sections.push(
//                       new Paragraph({
//                         children,
//                         numbering: { reference: "default-numbering", level: 0 },
//                       })
//                     );
//                   } else {
//                     // Regular paragraph with markdown parsing
//                     if (inList) inList = false;
//                     const children = parseMarkdown(line);
//                     sections.push(new Paragraph({ children }));
//                   }
//                 } else if (inList) {
//                   // Empty line after list
//                   inList = false;
//                   sections.push(new Paragraph({ text: "" }));
//                 } else {
//                   // Empty line
//                   sections.push(new Paragraph({ text: "" }));
//                 }
//               });
//             });
//           }
//         });
//       });
//     } else if (docData.body) {
//       // Process markdown content
//       const contentLines = docData.body.split("\n");
//       let inList = false;

//       contentLines.forEach((line) => {
//         if (line.trim()) {
//           // Check for headings
//           if (line.startsWith("# ")) {
//             sections.push(
//               new Paragraph({
//                 text: line.substring(2),
//                 heading: HeadingLevel.HEADING_1,
//                 spacing: { before: 240, after: 120 },
//               })
//             );
//           } else if (line.startsWith("## ")) {
//             sections.push(
//               new Paragraph({
//                 text: line.substring(3),
//                 heading: HeadingLevel.HEADING_2,
//                 spacing: { before: 200, after: 80 },
//               })
//             );
//           } else if (line.startsWith("### ")) {
//             sections.push(
//               new Paragraph({
//                 text: line.substring(4),
//                 heading: HeadingLevel.HEADING_3,
//                 spacing: { before: 160, after: 60 },
//               })
//             );
//           } else if (line.startsWith("- ") || line.startsWith("* ")) {
//             // Handle list items
//             if (!inList) {
//               inList = true;
//             }
//             const listText = line.substring(2);
//             const children = parseMarkdown(listText);
//             sections.push(
//               new Paragraph({
//                 children,
//                 bullet: { level: 0 },
//               })
//             );
//           } else {
//             // Regular paragraph with markdown parsing
//             if (inList) {
//               inList = false;
//             }
//             const children = parseMarkdown(line);
//             sections.push(new Paragraph({ children }));
//           }
//         } else {
//           // Empty line
//           sections.push(new Paragraph({ text: "" }));
//         }
//       });
//     }

//     // Add document footer with metadata
//     sections.push(new Paragraph({ text: "", spacing: { before: 400 } }));
//     sections.push(
//       new Paragraph({
//         children: [
//           new TextRun({ text: "Created by: ", bold: true }),
//           new TextRun({ text: docData.createdBy }),
//         ],
//       })
//     );
//     sections.push(
//       new Paragraph({
//         children: [
//           new TextRun({ text: "Created: ", bold: true }),
//           new TextRun({ text: formatISODate(docData.createdAt) }),
//         ],
//       })
//     );
//     sections.push(
//       new Paragraph({
//         children: [
//           new TextRun({ text: "Last Updated: ", bold: true }),
//           new TextRun({ text: formatISODate(docData.updatedAt) }),
//         ],
//       })
//     );

//     // Create the document
//     const doc = new Document({
//       sections: [
//         {
//           properties: {},
//           children: sections,
//         },
//       ],
//     });

//     // Generate the document buffer
//     const buffer = await Packer.toBuffer(doc);

//     // Save the document
//     saveAs(
//       new Blob([buffer], {
//         type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       }),
//       `${docData.name}.docx`
//     );

//     return true;
//   } catch (err) {
//     console.error("Error generating DOCX:", err);
//     return false;
//   }
// };


"use client";

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
} from "docx";
import { saveAs } from "file-saver";

interface Section {
  section: string;
  content: Array<{
    subsection?: string;
    content?:
      | string
      | Array<{
          subsubsection?: string;
          content: string;
        }>;
  }>;
}

export const exportToDocx = async (
  documentData: any,
  parsedDocBody: Section[],
  formatDate: (date: string) => string
): Promise<boolean> => {
  try {
    // Create document metadata section
    const metadataSection = [
      new Paragraph({
        text: documentData.name,
        heading: HeadingLevel.TITLE,
      }),
      new Paragraph({
        text: documentData.description,
        style: "normalPara",
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Status: ", bold: true }),
          new TextRun(documentData.status),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Created by: ", bold: true }),
          new TextRun(documentData.createdBy),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Created at: ", bold: true }),
          new TextRun(formatDate(documentData.createdAt)),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Last updated: ", bold: true }),
          new TextRun(formatDate(documentData.updatedAt)),
        ],
      }),
      new Paragraph({
        text: "",
      }),
    ];

    // Create project info section
    const projectInfoSection = [
      new Paragraph({
        text: "Project Information",
        heading: HeadingLevel.HEADING_1,
      }),
      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: "Project Name", bold: true })] })],
                width: {
                  size: 30,
                  type: "auto",
                },
              }),
              new TableCell({
                children: [new Paragraph(documentData.project.name)],
                width: {
                  size: 70,
                  type: "auto",
                },
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: "Description", bold: true })] })],
              }),
              new TableCell({
                children: [new Paragraph(documentData.project.description)],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: "Type", bold: true })] })],
              }),
              new TableCell({
                children: [new Paragraph(documentData.project.projectType)],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: "Complexity", bold: true })] })],
              }),
              new TableCell({
                children: [new Paragraph(documentData.project.complexity)],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: "Status", bold: true })] })],
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    documentData.project.completionStatus.replace(/_/g, " ")
                  ),
                ],
              }),
            ],
          }),
        ],
        width: {
          size: 100,
          type: "auto",
        },
      }),
      new Paragraph({
        text: "",
      }),
    ];

    // Create document content sections
    const contentSections: Paragraph[] = [];

    if (parsedDocBody && parsedDocBody.length > 0) {
      // Add a title for the document content
      contentSections.push(
        new Paragraph({
          text: "Document Content",
          heading: HeadingLevel.HEADING_1,
        })
      );

      // Process each section
      parsedDocBody.forEach((section) => {
        // Add section heading
        contentSections.push(
          new Paragraph({
            text: section.section,
            heading: HeadingLevel.HEADING_2,
          })
        );

        // Process subsections
        section.content.forEach((subsectionData) => {
          if (subsectionData.subsection) {
            contentSections.push(
              new Paragraph({
                text: subsectionData.subsection,
                heading: HeadingLevel.HEADING_3,
              })
            );
          }

          if (typeof subsectionData.content === "string") {
            // Add simple string content
            contentSections.push(
              new Paragraph({
                text: subsectionData.content,
                style: "normalPara",
              })
            );
          } else if (Array.isArray(subsectionData.content)) {
            // Process subsubsections
            subsectionData.content.forEach((subsubsection) => {
              if (subsubsection.subsubsection) {
                contentSections.push(
                  new Paragraph({
                    text: subsubsection.subsubsection,
                    heading: HeadingLevel.HEADING_4,
                  })
                );
              }

              contentSections.push(
                new Paragraph({
                  text: subsubsection.content,
                  style: "normalPara",
                })
              );
            });
          }
        });
      });
    } else if (documentData.body) {
      // If there's no structured content but there is a body, add it as plain text
      contentSections.push(
        new Paragraph({
          text: "Document Content",
          heading: HeadingLevel.HEADING_1,
        })
      );

      // This is a simplification - in a real app you'd want to parse the markdown
      contentSections.push(
        new Paragraph({
          text: documentData.body,
          style: "normalPara",
        })
      );
    }

    // Create the document with all sections
    const doc = new Document({
      sections: [
        {
          children: [
            ...metadataSection,
            ...projectInfoSection,
            ...contentSections,
          ],
        },
      ],
      styles: {
        paragraphStyles: [
          {
            id: "normalPara",
            run: {
              size: 24, // 12pt
            },
            paragraph: {
              spacing: {
                after: 120, // 6pt spacing after paragraph
              },
            },
          },
        ],
      },
    });

    // Generate and save the document
    const buffer = await Packer.toBlob(doc);
    saveAs(buffer, `${documentData.name}.docx`);
    return true;
  } catch (error) {
    console.error("Error generating DOCX:", error);
    return false;
  }
};

