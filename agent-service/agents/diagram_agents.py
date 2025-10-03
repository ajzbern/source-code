import json
from agents.models.gemini.interface import init_gemini
from agents.models.groq.interface import init_groq
from langchain_core.prompts import PromptTemplate


def use_case_diagram(defination):
    requirements_finder = init_gemini()
    # requirements_finder = init_groq(model='deepseek-r1-distill-llama-70b')

    # Updated prompt template for generating a use case diagram in Mermaid chart format
    template = """
                You are the best sotware engineer in the world. Which is hired to generate use case diagrams in Mermaid chart format.
                Here is the project definition to be implemented:
                {defination}
                Your task is to generate a Mermaid diagram code for the use case diagram, focusing on the following:
                1. Actors involved in the system (e.g., Patient, Doctor).
                2. Use cases (e.g., Schedule Appointment, View Medical History).
                3. Relationships between actors and use cases (e.g., Patient -- "schedules" --> Appointment).
                4. Include any relevant details such as preconditions, postconditions, and triggers if mentioned in the definition.
                5. Use the Mermaid chart format for the diagram.
                Provide the output only as a JSON object with the key use_case_diagram, where the value is the Mermaid chart code like the given example below.
                Prepare the diagram according to the definition only. Do not include any explanation, extra text, or preamble.
                Only provide the raw JSON output with the Mermaid code in the correct format. Strictly follow the format and syntax. dont use bad syntax like this UC15[Data Protection (GDPR, FERPA)]
                For example: Definition: Student Management System
                "use_case_diagram":
                "graph TD
    %% Actors
    Student((Student))
    Parent((Parent))
    Faculty((Faculty))
    Administrator((Administrator))
    
    %% Use Cases
    UC1[Login to System]
    UC2[View Academic Progress]
    UC3[View Attendance]
    UC4[View Grades]
    UC5[Make Tuition Payments]
    UC6[Communicate with Faculty/Admin]
    UC7[Update Profile]
    UC8[View Student Progress]
    UC9[View Student Attendance]
    UC10[View Student Grades]
    UC11[Manage Student Grades]
    UC12[Manage Student Attendance]
    UC13[Communicate with Students/Parents/Admin]
    UC14[View Student Profiles]
    UC15[Identify At-Risk Students]
    UC16[Manage Student Admissions]
    UC17[Generate Reports]
    UC18[Manage User Accounts]
    UC19[Manage Financial Transactions]
    UC20[Allocate Scholarships]
    UC21[Monitor System Performance]
    UC22[Manage Data Security and Privacy]
    UC23[Configure System Settings]
    UC24[Perform Predictive Analytics]
    
    %% Included Use Cases
    UC25[Role-Based Access Control]
    UC26[AI-Driven Performance Analytics]
    UC27[Customizable Reports and Dashboards]
    UC28[Biometric Attendance Tracking]
    UC29[Invoicing and Payment Tracking]
    UC30[Student Lifecycle Management]
    
    %% Student Relationships
    Student -->|uses| UC1
    Student -->|uses| UC2
    Student -->|uses| UC3
    Student -->|uses| UC4
    Student -->|uses| UC5
    Student -->|uses| UC6
    Student -->|uses| UC7
    
    %% Parent Relationships
    Parent -->|uses| UC1
    Parent -->|uses| UC8
    Parent -->|uses| UC9
    Parent -->|uses| UC10
    Parent -->|uses| UC5
    Parent -->|uses| UC6
    
    %% Faculty Relationships
    Faculty -->|uses| UC1
    Faculty -->|uses| UC11
    Faculty -->|uses| UC12
    Faculty -->|uses| UC13
    Faculty -->|uses| UC14
    Faculty -->|uses| UC15
    
    %% Administrator Relationships
    Administrator -->|uses| UC1
    Administrator -->|uses| UC16
    Administrator -->|uses| UC17
    Administrator -->|uses| UC18
    Administrator -->|uses| UC19
    Administrator -->|uses| UC20
    Administrator -->|uses| UC21
    Administrator -->|uses| UC22
    Administrator -->|uses| UC23
    Administrator -->|uses| UC24
    
    %% Include Relationships
    UC1 -->|includes| UC25
    UC11 -->|includes| UC26
    UC17 -->|includes| UC27
    UC12 -->|includes| UC28
    UC19 -->|includes| UC29
    UC16 -->|includes| UC30";
            """

    # Initialize the prompt with the input definition
    prompt = PromptTemplate(template=template, input_variables=["defination"])

    # Chain the prompt with the requirements finder
    requirements_chain = prompt | requirements_finder

    # Invoke the chain with the provided definition
    result = requirements_chain.invoke({"defination": defination})
    # result = requirements_chain.invoke({"defination": defination}).content

    start_idx = result.find("{")
    end_idx = result.rfind("}") + 1

    result = result[start_idx:end_idx]

    if '```mermaid' in result:
        result = result.replace("```mermaid", "")
        result = result.replace("```", "")

    if 'actor' in result:
        result = result.replace("actor", "")
    # Extract the Mermaid chart code from the result

    # print(json.loads(result))

    try:
        json_result = json.loads(result)
    except:
        json_result = {}
        json_result['use_case_diagram'] = ""

    with open("./docs/use_case_diagram.txt", "w") as f:
        f.write(json_result['use_case_diagram'])

    return json_result['use_case_diagram']


def er_diagram(defination, key_features):
    requirements_finder = init_gemini()
    # requirements_finder = init_groq(model='deepseek-r1-distill-llama-70b')

    # Updated prompt template for generating a use case diagram in Mermaid chart format
    template = """
                You are an AI-powered agent that generates Entity-Relationship (ER) diagrams in Mermaid chart format.
                Here is the project definition to be implemented: 
                {defination}
                Here is the key features to be implemented:
                {key_features}

                Your task is to generate a Mermaid diagram code for the Entity-Relationship diagram, focusing on the following:
                1. Entities involved in the system (e.g., Patient, Doctor, Appointment). 
                2. Attributes of each entity (e.g., Patient: ID, Name, Age).
                3. Relationships between entities (e.g., Patient -- "makes" --> Appointment).
                4. Cardinality (e.g., one-to-many, many-to-one) between entities.
                5. Indicate any primary keys and foreign keys if mentioned in the definition.
                
                Provide the output only as a JSON object with the key er_diagram, where the value is the Mermaid chart code like the given example below.
                Prepare the diagram according to the definition only. Do not include any explanation, extra text, or preamble. 
                Only provide the raw JSON output with the Mermaid code in the correct format.
                
                For example: Definition: Hospital Management System
                "er_diagram":"erDiagram
  STUDENT ||--o{{ ORDER : places
  STUDENT ||--o{{ ADMISSION : applies
  STUDENT ||--o{{ COMMUNICATIONCHANNEL : uses
  STUDENT ||--o{{ ATTENDANCE : has
  STUDENT ||--o{{ GRADINGSYSTEM : receives
  STUDENT ||--o{{ ACADEMICPROGRESS : achieves
  FINANCIALTRANSACTION ||--o{{ STUDENT : related_to
  FINANCIALTRANSACTION ||--o{{ ORDER : pertains_to
    
  STUDENT {{
    string name
    string studentId PK
    string email
    string phone
    string password
    string role
  }}
  ORDER {{
    string orderId PK
    string status
  }}
  ADMISSION {{
    string admissionId PK
    string status
  }}
  COMMUNICATIONCHANNEL {{
    string channelId PK
    string type
  }}
  ATTENDANCE {{
    string attendanceId PK
    date date
    bool present
  }}
  GRADINGSYSTEM {{
    string gradeId PK
    string subject
    string grade
  }}
  ACADEMICPROGRESS {{
    string progressId PK
    string description
  }}
  FINANCIALTRANSACTION {{
    string transactionId PK
    float amount
    string type
  }}"
                """

    # Initialize the prompt with the input definition
    prompt = PromptTemplate(template=template, input_variables=["defination", "key_features"])

    # Chain the prompt with the requirements finder
    requirements_chain = prompt | requirements_finder

    # Invoke the chain with the provided definition and key features
    result = requirements_chain.invoke({"defination": defination, "key_features": key_features})
    # result = requirements_chain.invoke({"defination": defination}).content
    # Extract the Mermaid chart code from the result
    # print(result)
    start_idx = result.find("{")
    end_idx = result.rfind("}") + 1

    result = result[start_idx:end_idx]

    # Parse the result as JSON to ensure proper structure
    try:
        json_result = json.loads(result)
    except:
        json_result = {}
        json_result['er_diagram'] = ""

    with open("./docs/er_diagram.txt", "w") as f:
        f.write(json_result['er_diagram'])

    return json_result['er_diagram']