from pathlib import Path
from agents.ai_agents import *
from agents.format_response import *
from agents.pipeline import main_pipeline
from agents.pipeline_groq import main_pipeline_groq
from flask import Flask, request, jsonify, render_template


BASE_DIR = Path(__file__).resolve().parent

# Flask app initialization
app = Flask(__name__)

# Template rendering setup
app.template_folder = str(Path(BASE_DIR, 'templates'))
app.static_folder = str(Path(BASE_DIR, 'static'))

ssd_request = None


@app.route("/")
def home():
    return jsonify({"message": "Welcome to the AgentX Service!"})


@app.route("/pipeline", methods=["POST"])
def ask():
    data = request.get_json()
    # print(data)
    # Check if definition is provided in the request body
    if len(data) > 5:
        result = main_pipeline(data)
        response_type = data.get("response_type", "json")
        if response_type == "json":
            return jsonify(result)
        else:
            ba_result = ba_format_response(result['requirements'])
            po_result = po_format_response(result['goals'])
            pm_result = pm_format_response(result['documentation'])
            ssd_result = ssd_format_response(result['Tasks'])
            return jsonify({"requirements": ba_result, "goals": po_result, "documentation": pm_result, "tasks": ssd_result})
    else:
        return jsonify({"error": "Some parameters are missing in the request body"}), 400


@app.route("/pipeline_groq", methods=["POST"])
def ask_groq():
    data = request.get_json()
    print(data)
    # Check if definition is provided in the request body
    if len(data) > 5:
        result = main_pipeline_groq(data)
        response_type = data.get("response_type", "json")
        if response_type == "json":
            return jsonify(result)
        else:
            ba_result = ba_format_response(result['requirements'])
            po_result = po_format_response(result['goals'])
            pm_result = pm_format_response(result['documentation'])
            ssd_result = ssd_format_response(result['Tasks'])
            return jsonify({"requirements": ba_result, "goals": po_result, "documentation": pm_result, "tasks": ssd_result})
    else:
        return jsonify({"error": "Some parameters are missing in the request body"}), 400


@app.route("/ba_agent", methods=["POST"])
def ba_agent():
    data = request.get_json()
    # Check if definition is provided in the request body
    if len(data) > 5:
        ba_request, ssd_request, num = parse_request(data)
        analyzed_requirements = buisness_analyst(ba_request)
        response_type = data.get("response_type", "json")
        if response_type == "json":
            return jsonify({"requirements": analyzed_requirements})
        else:
            formatted_responses = ba_format_response(analyzed_requirements)
            return jsonify({"message": formatted_responses})
    else:
        return jsonify({"error": "Definition is missing in the request body"}), 400


@app.route("/po_agent", methods=["POST"])
def po_agent():
    data = request.get_json()

    # Check if definition is provided in the request body
    if "definition" in data:
        product_roadmap = project_owner(
            data["definition"], data["requirements"])
        response_type = data.get("response_type", "json")
        if response_type == "json":
            return jsonify({"goals": product_roadmap})
        else:
            formatted_responses = po_format_response(product_roadmap)
            return jsonify({"message": formatted_responses})
    else:
        return jsonify({"error": "Definition is missing in the request body"}), 400


@app.route("/pm_agent", methods=["POST"])
def pm_agent():
    data = request.get_json()

    # Check if goals are provided in the request body
    if "goals" in data:
        project_plan = project_manager(data["goals"])
        response_type = data.get("response_type", "json")
        if response_type == "json":
            return jsonify({"documentation": project_plan})
        else:
            formatted_responses = pm_format_response(project_plan)
            return jsonify({"message": formatted_responses})
    else:
        return jsonify({"error": "Goals is missing in the request body"}), 400


@app.route("/ssd_agent", methods=["POST"])
def ssd_agent():
    data = request.get_json()

    # Check if documentation is provided in the request body
    if "documentation" in data:
        development_plan = senior_software_dev(
            data["num_of_devs"], data["documentation"])
        response_type = data.get("response_type", "json")
        if response_type == "json":
            return jsonify({"Tasks": development_plan})
        else:
            formatted_responses = ssd_format_response(development_plan)
            return jsonify({"message": formatted_responses})
    else:
        return jsonify({"error": "Documentation is missing in the request body"}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
