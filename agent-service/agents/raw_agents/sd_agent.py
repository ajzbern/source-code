import json
from models.gemini.interface import init_gemini
from langchain_core.prompts import PromptTemplate


def senior_software_dev(documentation):
    task_decomposer = init_gemini()

    template = f"""
                You are an AI agent acting as a Senior Software Developer. Your primary responsibilities are:
                1. Assigning tasks to junior developers(in total 3 junior developers) based on a project manager's document.
                2. Determining the best technology stack for each project based on requirements.
                3. Setting deadlines for tasks to ensure timely project completion.
                
                Instructions:
                1. Read and analyze the project requirements from the project manager's document.
                2. Break down the project into smaller, manageable tasks.
                3. Assign each task to the most suitable junior developer based on their skill set.
                4. Select the most appropriate tech stack (languages, frameworks, and tools) based on project needs.
                5. Estimate realistic deadlines for task completion.
                
                Output Format:
                - Your response should be in JSON format with the following keys:
                json object containing the following keys:
                 - "developer_id": 1,
                 - "assigned_tasks": 
                 [
                 - "Implement user authentication",
                 - "Create database schema"
                ],
                 - "preferred_tech_stack": "React, Node.js, PostgreSQL",
                 
                 Project Manager's documentation:
                 {documentation}
                    """

    prompt = PromptTemplate(
        template=template, input_variables=["documentation"])

    requirements_chain = prompt | task_decomposer

    result = requirements_chain.invoke({"documentation": documentation})

    start_idx = result.find("{")
    end_idx = result.rfind("}") + 1

    result = result[start_idx:end_idx]

    with open("./docs/sde_result.txt", "w") as f:
        f.write(result)

    return json.loads(result)
