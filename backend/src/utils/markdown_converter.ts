/**
 * Converts a Todo List Application specification JSON to a Markdown file
 * @param jsonData The Todo List Application specification in JSON format
 * @returns A string containing the Markdown representation of the JSON data
 */
export function convertJsonToMarkdown(jsonData: any): string {
  // Initialize the markdown string with the project title
  let markdown = `# ${jsonData.project_name}\n\n`;

  // Add Goals section
  markdown += "## Goals\n\n";
  if (jsonData.goals && jsonData.goals.length > 0) {
    jsonData.goals.forEach((goal: string) => {
      markdown += `- ${goal}\n`;
    });
  }
  markdown += "\n";

  // Add Functional Requirements section
  markdown += "## Functional Requirements\n\n";
  if (
    jsonData.functional_requirements &&
    jsonData.functional_requirements.length > 0
  ) {
    jsonData.functional_requirements.forEach((req: string, index: number) => {
      markdown += `${index + 1}. ${req}\n`;
    });
  }
  markdown += "\n";

  // Add Non-Functional Requirements section
  markdown += "## Non-Functional Requirements\n\n";
  if (
    jsonData.non_functional_requirements &&
    jsonData.non_functional_requirements.length > 0
  ) {
    jsonData.non_functional_requirements.forEach(
      (req: string, index: number) => {
        markdown += `${index + 1}. ${req}\n`;
      }
    );
  }
  markdown += "\n";

  // Add Technical Requirements section
  markdown += "## Technical Requirements\n\n";
  if (
    jsonData.technical_requirements &&
    jsonData.technical_requirements.length > 0
  ) {
    jsonData.technical_requirements.forEach((req: string) => {
      markdown += `- ${req}\n`;
    });
  }
  markdown += "\n";

  // Add Stakeholder Requirements section if they exist
  if (jsonData.stakeholder_requirements) {
    markdown += "## Stakeholder Requirements\n\n";

    for (const stakeholder in jsonData.stakeholder_requirements) {
      markdown += `### ${stakeholder}\n\n`;

      if (
        Array.isArray(jsonData.stakeholder_requirements[stakeholder]) &&
        jsonData.stakeholder_requirements[stakeholder].length > 0
      ) {
        jsonData.stakeholder_requirements[stakeholder].forEach(
          (req: string) => {
            markdown += `- ${req}\n`;
          }
        );
      } else {
        markdown += "_No specific requirements listed._\n";
      }
      markdown += "\n";
    }
  }

  return markdown;
}
