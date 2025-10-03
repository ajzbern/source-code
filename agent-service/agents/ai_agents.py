import json
from agents import *
from .models.gemini.interface import init_gemini
from langchain_core.prompts import PromptTemplate
from .format_response import *
import warnings
warnings.filterwarnings("ignore")

"""
BA
{
    "name": "Toto apasdfpdfghd3",
    "projectType": "DEVELOPMENT",
    "complexity": "LOW",
    "description": "Simple toodd dfgh",
    "Employee":"Deignation
    
Return:

}
SSD
{
    doc_name
    doc_descrip
    doc_body
    {
        "name": Task 1
        desc:
        priority:
        assined_to:
    }
}

"""


def buisness_analyst(defination):
    requirements_finder = init_gemini()

    template = f"""
                    You are an AI-powered Business Analyst agent. 
                    Your goal is to facilitate requirement gathering for projects by engaging in structured conversations. 
                    Extract and document requirements comprehensively in a format that stakeholders can review. 
                    Return your findings as a JSON document.

                    Instructions for Interaction:
                    1. Begin by understanding the user's received project description and its main goals don't ask for any extra information.
                    2. Categorize the requirements into Functional, Non-Functional, Technical, and Stakeholder-Specific groups..
                    3. Organize all data into a JSON format with the following structure:
                        - doc_name: (string) (eg. Software Requirements Specification)
                        - doc_desc:  (string) (Small description about this documentation)
                        - goals: (list of strings)
                        - functional_requirements: (list of strings)
                        - non_functional_requirements: (list of strings)
                        - technical_requirements: (list of strings)
                        - stakeholder_requirements: (array with stakeholder names as keys and their requirements as lists).
                    
                    - Example Interaction:
                        - User Input: "We need an e-commerce website to sell our products globally with real-time inventory management."
                    
                    Example Output JSON:
                    "project_name": "Global E-Commerce Website"
                    "doc_name": "Software Requirements Specification",
                    "doc_desc": "This document outlines the requirements for the Global E-Commerce Website, detailing functional, non-functional, technical, and stakeholder-specific requirements.",
                    "goals": [
                        "Provide a seamless global e-commerce experience for users.",
                        "Allow easy product discovery and purchase across multiple regions.",
                        "Ensure robust security and privacy for transactions and personal data.",
                        "Support multiple languages and currencies for international users.",
                        "Implement scalable infrastructure to handle global traffic."
                    ],
                    "functional_requirements": [
                        "User account creation and management (sign-up, login, profile updates).",
                        "Product catalog with search and filter functionalities.",
                        "Shopping cart for adding, updating, and removing items.",
                        "Order placement with payment gateway integration.",
                        "Order tracking and history for users.",
                        "Admin panel for inventory management, order management, and reporting.",
                        "Integration with third-party APIs (payment systems, shipping, etc.)."
                    ],
                    "non_functional_requirements": [
                        "High availability and uptime (99.9% availability).",
                        "Fast page load times (under 3 seconds).",
                        "Responsive design to ensure usability across devices (mobile, tablet, desktop).",
                        "Data encryption for secure user transactions and storage.",
                        "Scalable infrastructure to handle increasing user traffic and product catalog growth.",
                        "Compliance with GDPR and other regional data privacy laws."
                    ],
                    "technical_requirements": [
                        "Web application hosted on a cloud-based platform (AWS, Azure, etc.).",
                        "Responsive front-end using modern frameworks (React, Vue.js, etc.).",
                        "Backend server using Node.js, Python, or Java for API management.",
                        "Database management system (MySQL, PostgreSQL, or MongoDB) for storing product, user, and order data.",
                        "Integration with payment gateways (PayPal, Stripe, etc.).",
                        "Search functionality powered by Elasticsearch or a similar tool.",
                        "Multi-language and multi-currency support using i18n libraries and localization tools."
                    ],
                    "stakeholder_requirements": 
                        "Project Manager": [
                        "Ensure the project meets deadlines and budget constraints.",
                        "Facilitate communication between all teams (development, design, marketing).",
                        "Provide regular status updates to higher management."
                        ],
                        "Product Owner": [
                        "Ensure the website meets the business goals of increasing sales globally.",
                        "Prioritize features based on user needs and business requirements.",
                        "Define product vision and user stories."
                        ],
                        "Development Team": [
                        "Deliver clean, scalable, and well-documented code.",
                        "Ensure the website is bug-free and optimized for performance.",
                        "Collaborate with other teams (design, QA, etc.) to ensure a smooth development process."
                        ],
                        "UX/UI Designers": [
                        "Design an intuitive, user-friendly interface.",
                        "Ensure the website is responsive and visually appealing across all devices.",
                        "Create prototypes and wireframes to guide the development process."
                        ],
                        "Quality Assurance (QA) Team": [
                        "Ensure the website is thoroughly tested for bugs and functionality issues.",
                        "Test the website's usability across multiple browsers and devices.",
                        "Ensure compliance with security standards and data privacy regulations."
                        ],
                        "Marketing Team": [
                        "Promote the website to global users through digital campaigns.",
                        "Provide insights on user behavior to enhance the user experience.",
                        "Coordinate the launch and post-launch marketing activities."
                        ],
                        "End Users": [
                        "Easily browse and purchase products.",
                        "Enjoy a secure, fast, and smooth shopping experience.",
                        "Access customer support and order tracking features."
                        ]
                        
                    Task Execution Guidelines:
                        - Engage interactively to gather detailed input.
                        - Ensure each requirement is specific and testable.
                        - Repeat the JSON format back to the user for confirmation before finalizing.
                        
                Here is the project defination to be implemented.
                {defination}
                
                provide sole output as json no preemble explaination required.
                """

    prompt = PromptTemplate(template=template, input_variables=["defination"])

    requirements_chain = prompt | requirements_finder

    result = requirements_chain.invoke({"defination": defination})

    start_idx = result.find("{")
    end_idx = result.rfind("}") + 1

    result = result[start_idx:end_idx]

    # with open("./docs/ba_result.txt", "w") as f:
    #     f.write(result)

    return result


def project_owner(defination, requirements):
    requirements_finder = init_gemini()
    formated_requirements = ba_format_response(requirements)

    template = f"""
                You are a Product Owner AI agent with expertise in Agile project management and backlog prioritization. 
                
                Your responsibilities include:
                    1. Goal Analysis and Prioritization: 
                     - Review input goals provided by the business analyst. Assess their relevance, urgency, and alignment with the product vision. 
                     - Assign a priority level (e.g., High, Medium, Low) to each goal based on business impact and feasibility.

                    2. Backlog Management: Maintain a well-organized product backlog by categorizing tasks, features, and improvements. 
                     - Ensure all items are updated with clear descriptions, priorities, and status (e.g., To Do, In Progress, Completed).
                     - Instruction and Output: Summarize the top-priority goals into a JSON object formatted as follows:
                        "priority_goals": [
                            "id": "unique_goal_id",
                            "title": "Goal Title",
                            "description": "Detailed description of the goal",
                            "priority": "High/Medium/Low",
                            "status": "To Do/In Progress/Completed"
                        ]
                
                    3. Project Manager Communication: Provide clear instructions to the project manager by listing the main priority goals along with recommended next steps to address them.
                     - Input Example:
                        - Goals from business analysts (e.g., "Improve website UX", "Launch feature X by Q2").
                        - Current product backlog items.
                        
                     - Output Example:
                       - JSON structure of priority goals as described above.
                       - A summary message to the project manager:
                         - "The top three goals for this sprint are defined in the JSON output. 
                            Please prioritize resources to address these items by [specific deadline]. Begin by [specific recommendation]."
                
                Example output:
                "project_name":"To-Do List Application"
                "priority_goals": [
                            "id": "1",
                            "title": "Build frontend",
                            "description": "Please use ReactJS to build frontend application and ensure that it is responsive to all devices.",
                            "priority": "High",
                            "status": "To Do"
                        ] 
                "priority_goals": [
                            "id": "2",
                            "title": "Build Backend",
                            "description": "Please use NodeJS to build backend server and ensure that it is scalable enough for multiple users to all devices.",
                            "priority": "High",
                            "status": "To Do"
                        ] 
                
                Constraints:
                Always align with Agile principles.
                Outputs must be actionable, concise, and prioritized effectively.

                Generate an actionable response based on the following input data:
                Here is the project defination to be implemented.
                {defination}
                
                and analyzed project goals and neccessary things by buisness analyst:
                {formated_requirements}
                Provide sole output as json no preemble explaination required.
                """

    prompt = PromptTemplate(template=template, input_variables=[
                            "defination", "formated_requirements"])

    requirements_chain = prompt | requirements_finder

    result = requirements_chain.invoke(
        {"defination": defination, "formated_requirements": formated_requirements})

    start_idx = result.find("{")
    end_idx = result.rfind("}") + 1
    result = result[start_idx:end_idx]

    # with open("./agents-service/docs/po_result.txt", "w") as f:
    #     f.write(result)

    return result


def project_manager(goals):
    task_decomposer = init_gemini()
    formated_goals = po_format_response(goals)
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
                        {formated_goals}
                        provide sole output as json no preemble explaination required.
                    """

    prompt = PromptTemplate(template=template, input_variables=["goals"])

    requirements_chain = prompt | task_decomposer

    result = requirements_chain.invoke({"formated_goals": formated_goals})
    # return result.content
    start_idx = result.find("{")
    end_idx = result.rfind("}") + 1
    result = result[start_idx:end_idx]

    # with open("./agents-service/docs/pm_result.txt", "w") as f:
    #     f.write(result)

    return result


def senior_software_dev(num_of_devs, documentation, ssd_request):
    task_decomposer = init_gemini()
    formated_documentation = pm_format_response(documentation)
    template = f"""
                You are an AI agent acting as a Senior Software Developer responsible for project planning, task delegation, and technology selection. 
                
                Your primary responsibilities include:
                1. Assigning tasks to {num_of_devs} employees based on their skill sets and project requirements. 
                2. Here are the employees available to work with their designations: {ssd_request}
                
                3. Selecting the most suitable technology stack for each project.
                    - Setting realistic deadlines for task completion to ensure timely project delivery.

                Instructions:
                - Analyze the project manager's document to extract key project requirements.
                - Break down the project into well-defined, manageable tasks.
                - Match each task with the most suitable junior developer based on their expertise.
                - Determine the appropriate technology stack (programming languages, frameworks, databases, and tools).
                - Estimate realistic deadlines for each task.
                
                Output Format (JSON): 
                Return the structured response in a JSON array with the following keys:
                - name: (string) Task name
                - desc: (string) Description of the task, including the technology stack used
                - priority: (string) Low/Medium/High
                - assigned_to: (string) Only designation of employees (must be one of the available employees with the best skill set)
                - required_skills: (list) Contaninig required skills to complete task with availble skillset only
                - deadline: (string) Deadline for task completion in days
                          
                json structure:
                [
                
                    "name": "Set up database",
                    "desc": "Create and configure the PostgreSQL database for the application.",
                    "priority": "High",
                    "assigned_to": "Senior Database Administrator"
                    "required_skills": ["PostgreSQL", "SQL"],
                    "deadline": "3"
                ,
                
                    "name": "Develop API endpoints",
                    "desc": "Implement RESTful API endpoints using Node.js and Express framework.",
                    "priority": "High",
                    "assigned_to": "Backend Developer"
                    "required_skills": ["Node.js", "Express"],
                    "deadline": "3"
                ,
                
                    "name": "Design user interface",
                    "desc": "Create responsive UI components using React and CSS.",
                    "priority": "Medium",
                    "assigned_to": "Frontend Developer"
                    "required_skills": ["React", "CSS"],
                    "deadline": "2"
                ,
                
                    "name": "Write unit tests",
                    "desc": "Develop unit tests for the API using Jest.",
                    "priority": "Low",
                    "assigned_to": "QA Tester"
                    "required_skills": ["Jest", "Unit Testing"],
                    "deadline": "5"
                
            ]
                            
            Project Manager's documentation:
            {formated_documentation}
            """

    prompt = PromptTemplate(
        template=template, input_variables=["documentation"])

    requirements_chain = prompt | task_decomposer

    result = requirements_chain.invoke(
        {"formated_documentation": formated_documentation})

    start_idx = result.find("[")
    end_idx = result.rfind("]") + 1

    result = result[start_idx:end_idx]
    # result = result[8:-4]

    # with open("./docs/sde_result.txt", "w") as f:
    #     f.write(result)

    return result
