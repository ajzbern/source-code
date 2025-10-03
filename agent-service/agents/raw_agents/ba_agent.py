import json
from models.gemini.interface import init_gemini
from langchain_core.prompts import PromptTemplate

import warnings
warnings.filterwarnings("ignore")


def buisness_analyst(defination):
    requirements_finder = init_gemini()
    template = f"""
                    You are an AI-powered Business Analyst agent. 
                    Your goal is to facilitate requirement gathering for projects by engaging in structured conversations. 
                    Extract and document requirements comprehensively in a format that stakeholders can review. 
                    Return your findings as a JSON document.

                    Instructions for Interaction:
                    1. Begin by understanding the user's project and its main goals don't ask for any extra information.
                    2. Categorize the requirements into Functional, Non-Functional, Technical, and Stakeholder-Specific groups..
                    3. Organize all data into a JSON format with the following structure:
                        - project_name: (string)
                        - goals: (list of strings)
                        - functional_requirements: (list of strings)
                        - non_functional_requirements: (list of strings)
                        - technical_requirements: (list of strings)
                        - stakeholder_requirements: (dictionary with stakeholder names as keys and their requirements as lists).
                    
                    - Example Interaction:
                        - User Input: "We need an e-commerce website to sell our products globally with real-time inventory management."
                    
                    Example Output JSON:
                    "project_name": "Global E-Commerce Website",
                    "goals": [
                        "Sell products globally",
                        "Manage real-time inventory"
                    ],
                    "functional_requirements": [
                        "User account registration",
                        "Real-time inventory updates",
                        "Payment processing integration"
                    ],
                    "non_functional_requirements": [
                        "High availability with 99.9% uptime",
                        "Multilingual support"
                    ],
                    "technical_requirements": [
                        "Integration with ERP systems",
                        "Support for responsive design"
                    ],
                    "stakeholder_requirements": 
                        "Marketing Team": [Multilingual website support],
                        "IT Team": [Integration with current ERP"]
                  
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
    
    with open("./docs/ba_result.txt", "w") as f:
        f.write(result)
    
    return json.loads(result)


