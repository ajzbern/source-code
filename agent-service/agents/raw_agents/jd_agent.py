import os
import json
from models.gemini.interface import init_gemini
from langchain_core.prompts import PromptTemplate
from langchain.agents import Tool


def create_directory(path: str) -> str:
    try:
        os.makedirs(path, exist_ok=True)
        return f"Directory created: {path}"
    except Exception as e:
        return f"Error creating directory {path}: {str(e)}"


def write_file(file_path: str, content: str) -> str:
    try:
        dir_name = os.path.dirname(file_path)
        if dir_name and not os.path.exists(dir_name):
            os.makedirs(dir_name, exist_ok=True)
        with open(file_path, "w") as f:
            f.write(content)
        return f"File written: {file_path}"
    except Exception as e:
        return f"Error writing file {file_path}: {str(e)}"


def read_file(file_path: str) -> str:
    try:
        with open(file_path, "r") as f:
            return f.read()
    except Exception as e:
        return f"Error reading file {file_path}: {str(e)}"


def list_directory(path: str) -> str:
    try:
        contents = os.listdir(path)
        return json.dumps(contents)
    except Exception as e:
        return f"Error listing directory {path}: {str(e)}"


# Wrap the functions as LangChain Tools (optional for integration with an agent)
file_management_tools = [
    Tool(
        name="create_directory",
        func=create_directory,
        description="Creates a directory given a path."
    ),
    Tool(
        name="write_file",
        func=write_file,
        description="Writes content to a file given a file path and content."
    ),
    Tool(
        name="read_file",
        func=read_file,
        description="Reads and returns the content of a file given its file path."
    ),
    Tool(
        name="list_directory",
        func=list_directory,
        description="Lists the contents of a directory given its path."
    )
]

# This helper function will process and execute any file management actions.


def process_file_management_actions(actions):
    results = []
    for action in actions:
        act = action.get("action")
        params = action.get("parameters", {})
        if act == "create_directory":
            res = create_directory(**params)
        elif act == "write_file":
            res = write_file(**params)
        elif act == "read_file":
            res = read_file(**params)
        elif act == "list_directory":
            res = list_directory(**params)
        else:
            res = f"Unknown action: {act}"
        results.append(res)
    return results


def juniour_dev_1(tasks):
    task_decomposer = init_gemini()

    # Updated prompt including instructions for file/directory management.
    template = f"""
                You are an AI-powered Junior Developer working on a project. Your role is to:
                1. Understand the assigned tasks given by the Senior Developer.
                2. Break down the task into smaller steps to ensure smooth implementation.
                3. Write clean, error-free, and optimized code following best practices.
                4. Test the code thoroughly before submission.
                5. Seek clarifications if any requirement is unclear.
                
                Instructions:
                1. Carefully read the task description and identify the expected functionality.
                2. Determine the best approach to implement the feature based on the given tech stack.
                3. Write well-structured and commented code to ensure readability.
                4. Perform unit testing and verify correctness before considering the task complete.
                5. Optimize code performance and follow security best practices.
                
                Output Format:
                Your response should be in JSON format with the following keys:
                
                  "task_id": <number>,
                  "task_description": <string>,
                  "implementation_steps": <list of strings>,
                  "code_snippet": <string>,
                  "test_cases": <list of strings>,
                  "file_management_actions": <list of actions>,                

                The "file_management_actions" key should contain a list of any required file or directory management actions.
                Each action should be an object with the following structure:
                
                    "action": "create_directory" | "write_file" | "read_file" | "list_directory",
                    "parameters": 
                        For "create_directory": "path": <string>,
                        For "write_file": "file_path": <string>, "content": <string>,
                        For "read_file": "file_path": <string>,
                        For "list_directory": "path": <string>
                    
                If no file management is required, return an empty list for "file_management_actions".

                Your assigned task:
                {tasks}
                """

    prompt = PromptTemplate(template=template, input_variables=["tasks"])
    requirements_chain = prompt | task_decomposer

    result_str = requirements_chain.invoke({"tasks": tasks})

    # Write the raw result to a file for logging/debugging.
    with open("./docs/jr_result_1.txt", "w") as f:
        f.write(result_str)

    result_json = json.loads(result_str[8:-4])

    # Execute any file management actions provided by the AI.
    if "file_management_actions" in result_json and result_json["file_management_actions"]:
        actions_results = process_file_management_actions(
            result_json["file_management_actions"])
        result_json["file_management_results"] = actions_results

    return result_json
