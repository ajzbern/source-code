from agents import *
from time import sleep
from .format_response import *
from .diagram_agents import use_case_diagram, er_diagram
from .ai_agents import buisness_analyst, project_owner, project_manager, senior_software_dev


def main_pipeline(request):
    ba_request, ssd_request, num_of_devs = parse_request(request)

    usecase = use_case_diagram(request.get("definition", ""))
    er = er_diagram(request.get("definition", ""))

    ba_result = buisness_analyst(ba_request)
    preprocess = json.loads(ba_result)
    # Extracting specific keys
    doc_name = preprocess['doc_name']
    doc_desc = preprocess['doc_desc']

    # Keys to drop
    drop_keys = ['doc_name', 'doc_desc']

    # Creating a new dictionary excluding the dropped keys
    doc_body = {key: value for key, value in preprocess.items()
                if key not in drop_keys}

    # requirements = ba_format_response(ba_result)
    # sleep(10)
    po_result = project_owner(ba_request, ba_result)
    # formated_po_result = po_format_response(po_result)
    # sleep(10)
    pm_result = project_manager(po_result)
    # formated_pm_result = pm_format_response(pm_result)
    # sleep(10)
    final_result = senior_software_dev(num_of_devs, pm_result, ssd_request)

    return {"name": doc_name, "description": doc_desc, "doc_body": doc_body, "tasks": json.loads(final_result), "er_diagram": er, "use_case_diagram": usecase}

# main("Todo List application with react and django")
