from agents import *
from time import sleep
from .groq_agents import *
from .format_response import *


def replace_braces_with_brackets(json_string):
    # Check if the string starts with '{' and ends with '}'
    if json_string.startswith("{") and json_string.endswith("}"):
        # Replace the first '{' with '[' and the last '}' with ']'
        modified_string = "[" + json_string[1:-1] + "]"
        return modified_string
    else:
        return json_string


def main_pipeline_groq(request):
    model = request.get("model", "deepseek-r1-distill-llama-70b")
    ba_request, ssd_request, num_of_devs = parse_request(request)

    ba_result = ba_agent_groq(model, ba_request)
    # print(ba_result)

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
    sleep(25)
    po_result = po_agent_groq(model, ba_request, ba_result)
    # print(po_result)
    # formated_po_result = po_format_response(po_result)
    sleep(25)
    pm_result = pm_agent_groq(model, po_result)
    # print(pm_result)
    # formated_pm_result = pm_format_response(pm_result)
    sleep(25)
    final_result = ssd_agent_groq(
        model, num_of_devs, pm_result, ssd_request)

    # final_result = replace_braces_with_brackets(final_result)
    # print(final_result)

    return {"name": doc_name, "description": doc_desc, "doc_body": doc_body, "tasks": final_result}
