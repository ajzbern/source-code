import json
import textwrap
# from agents import *


def parse_request(request):
    project_name = request.get("project_name", "")
    employees = request.get("employees", [])
    description = request.get("description", "")
    development_type = request.get("development_type", "")
    complexity = request.get("complexity", "")
    key_features = request.get("key_features", "")
    timeline = request.get("timeline", "")
    # Ensure employees is a list of dictionaries
    if not isinstance(employees, list):
        raise ValueError("Employees must be a list of dictionaries.")

    # Constructing the requests
    ba_request = (
        f"I want to build a {development_type} for the project '{project_name}'. Which involves this key features {', '.join(key_features)}."
        f"In brief, it is about {complexity} complexity and involves: {description}."
    )

    # Creating employee list with skillset
    employee_list = ', '.join(
        [f"{employee['name']} ({employee['designation']}, Skills: {', '.join(employee['skillset'])})" for employee in employees]
    )
    ssd_request = f"My team includes the following members: {employee_list}. and timeline to complete the project is {timeline} days."

    return ba_request, ssd_request, len(employees)


def ba_format_response(requirements_json):

    requirements = json.loads(requirements_json)

    project_name = requirements.get("project_name", "The project")

    goals = " and ".join(requirements.get("goals", []))

    functional_reqs = ", ".join(
        requirements.get("functional_requirements", []))

    non_functional_reqs = ", ".join(
        requirements.get("non_functional_requirements", []))

    technical_reqs = ", ".join(
        requirements.get("technical_requirements", []))

    stakeholders = requirements.get("stakeholder_requirements", {})

    stakeholder_text = []

    for role, reqs in stakeholders.items():
        stakeholder_text.append(f"{role}s require: " + ", ".join(reqs))

    stakeholder_reqs = " ".join(stakeholder_text)

    paragraph = textwrap.dedent(f"""
    1. The {project_name} aims to {goals}
    2. The application will include key functional features such as {functional_reqs}. 
    3. Additionally, it must meet non-functional requirements like {non_functional_reqs} to ensure usability and reliability. 
    4. On the technical side, the project will be built using {technical_reqs}. 
    5. From a stakeholder perspective, {stakeholder_reqs}. This ensures that the project is scalable, maintainable, and effective.
    """)

    return paragraph.strip()

# Function to generate a dynamic summary paragraph


def po_format_response(json_data):
    data = json.loads(json_data)

    # Extract project name and priority goals
    project_name = data["project_name"]
    priority_goals = data["priority_goals"]
    # message_to_project_manager = data["message_to_project_manager"]
    # Start the paragraph with the project name
    paragraph = f"For the project \'{project_name}\', the following priority goals have been set for the current sprint:\n"

    # Loop through each goal to add it to the paragraph dynamically
    for goal in priority_goals:
        id = goal["id"]
        title = goal["title"]
        description = goal["description"]
        priority = goal["priority"]
        status = goal["status"]

        paragraph += f"{id}. {title}: {description} (Priority: {priority}, Status: {status})\n"

    # Provide instructions for next steps
    paragraph += "To ensure smooth progress, it's important to allocate resources appropriately. "
    paragraph += "Begin with tasks that require the most immediate attention, making sure to maintain clear communication between teams for seamless integration."

    return paragraph.strip()


def pm_format_response(json_data):
    # Load the JSON data
    data = json.loads(json_data)

    # Extract project name, high-level requirements, and subtasks
    project_name = data.get("project", "Unknown Project")
    high_level_requirements = data.get("high_level_requirements", [])
    subtasks = data.get("subtasks", [])

    paragraph = f"Project: \"{project_name}\"\n\n"
    paragraph += "High-Level Requirements:\n"
    for requirement in high_level_requirements:
        paragraph += f"- {requirement}\n"

    paragraph += "\nSubtasks:\n"

    # Loop through each subtask to add it to the paragraph dynamically
    for subtask in subtasks:
        id = subtask.get("id", "Unknown ID")
        description = subtask.get("description", "No description provided")
        priority = subtask.get("priority", "Unknown priority")
        assignee = subtask.get("assignee", "Unassigned")
        instructions = subtask.get("instructions", "No instructions provided")

        paragraph += f"{id}.{description} (Priority: {priority}, Assignee: {assignee})\n"
        paragraph += f"Instructions: {instructions}\n\n"

    # Conclusion or next step message
    paragraph += "\nEnsure that tasks are completed in the order of their priority, with clear communication between teams. "
    paragraph += "Testing and debugging should be done continuously to ensure smooth integration of all components."

    return paragraph.strip()


def ssd_format_response(json_data):
    data = json.loads(json_data)
    # Initialize the paragraph to hold the summary
    paragraph = "Developer Assignment Summary:\n"

    # Loop through each developer to add their tasks and other details
    for developer in data:
        developer_id = developer["developer_id"]
        assigned_tasks = developer["assigned_tasks"]
        preferred_tech_stack = developer["preferred_tech_stack"]
        # Accessing the correct "deadline" key
        deadline = developer["deadline"]

        # Developer Header
        paragraph += f"Developer ID: {developer_id}\n"
        paragraph += f"Preferred Tech Stack: {', '.join(preferred_tech_stack)}\n"

        paragraph += "Assigned Tasks and Deadlines:\n"

        # Loop through the tasks and their deadlines
        for task in assigned_tasks:
            # Using the single deadline
            paragraph += f"- {task} (Deadline: {deadline})\n"

        paragraph += "\n"  # Add a newline between developers

    # Conclusion or next steps
    paragraph += "Ensure that all tasks are completed by their respective deadlines. Maintain clear communication with team leads for any blockers or dependencies."

    return paragraph.strip()


def jd_sep_generate_dynamic_paragraph(result):

    # developer_data dictionary to store each developer's details
    developer_data = {}

    # Process the data and organize by developer
    for developer in result:
        developer_id = developer["developer_id"]
        developer_info = {
            "assigned_tasks": developer["assigned_tasks"],
            "preferred_tech_stack": developer["preferred_tech_stack"],
            # Use "deadline" instead of "deadlines"
            "deadline": developer["deadline"]
        }
        developer_data[developer_id] = developer_info

    # Build a detailed task description string
    task_descriptions = []
    for developer_id, developer_info in developer_data.items():
        task_description = (
            f"Developer with id {developer_id} needs to complete the tasks {', '.join(developer_info['assigned_tasks'])} "
            f"using {', '.join(developer_info['preferred_tech_stack'])} with the deadline {developer_info['deadline']}.\n"
            f"Please make sure to complete the tasks on time and with the required quality.\n"
        )
        task_descriptions.append(task_description)

    return task_descriptions
