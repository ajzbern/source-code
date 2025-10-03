import json
from models.gemini.interface import init_gemini
from langchain_core.prompts import PromptTemplate

def pm_decomposer(goals):
    task_decomposer = init_gemini()

    template = f"""
                Task Description: 
                You are an AI agent assisting a product owner by breaking down tasks into smaller, actionable components, prioritizing them, and assigning them to a senior software developer. 
                
                Your task is to:
                    1. Understand the high-level requirements received by Product owner.
                    2. Decompose these requirements into subtasks.
                    3. Assign a priority to each subtask based on its dependency and importance.
                    4. Provide detailed instructions for implementation.
                    
                - Return all information in a structured JSON format.
                - Input Example: "I want to build a To-Do list application using ReactJS and NodeJS. The application should use an SQLite database stored locally."

                - Generated Response Structure
                    "project": "To-Do List Application",
                    "high_level_requirements": [
                        "Frontend in ReactJS",
                        "Backend in NodeJS",
                        "SQLite database for local storage"
                    ],
                    "subtasks": [
                        "id": 1,
                        "description": "Set up the project structure with ReactJS and NodeJS",
                        "priority": "High",
                        "instructions": "Initialize a React project using Create React App and set up an Express server in NodeJS.",
                        "assignee": "Senior Software Developer"
                        ,
                        
                        "id": 2,
                        "description": "Design the database schema for storing tasks",
                        "priority": "High",
                        "instructions": "Create an SQLite schema with tables for tasks (id, title, description, status, created_at, updated_at).",
                        "assignee": "Senior Software Developer"
                        ,
                        "id": 3,
                        "description": "Implement the backend API for CRUD operations",
                        "priority": "Medium",
                        "instructions": "Develop REST endpoints for creating, reading, updating, and deleting tasks. Ensure integration with SQLite.",
                        "assignee": "Senior Software Developer"
                        ,
                        "id": 4,
                        "description": "Build the frontend UI for task management",
                        "priority": "Medium",
                        "instructions": "Create components for listing tasks, adding new tasks, editing existing tasks, and deleting tasks. Use ReactJS state management for dynamic updates.",
                        "assignee": "Senior Software Developer"
                        ,
                        "id": 5,
                        "description": "Test and debug the application",
                        "priority": "Low",
                        "instructions": "Write unit tests for the backend and frontend components. Test API endpoints and UI functionalities.",
                        "assignee": "Senior Software Developer"
                        ]

                        Key Considerations:
                        Always prioritize subtasks with high dependencies first.
                        Provide clear and concise instructions for each subtask.
                        Ensure the JSON output is well-structured and ready for implementation.
                        Execution Notes: The AI agent should continuously refine the subtasks based on feedback and maintain a task history log for iterative development.
                        
                        Here is the goals anayzed by product owner:
                        {goals}
                        provide sole output as json no preemble explaination required.
                    """

    prompt = PromptTemplate(template=template, input_variables=["goals"])

    requirements_chain = prompt | task_decomposer

    result = requirements_chain.invoke({"goals": goals})
    # return result.content
    start_idx = result.find("{")
    end_idx = result.rfind("}") + 1
    result = result[start_idx:end_idx]
    
    with open("./docs/pm_result.txt", "w") as f:
        f.write(result)

    return json.loads(result)