from flask import Flask, jsonify, send_from_directory
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
import os

app = Flask(__name__)
app.config['PROPAGATE_EXCEPTIONS'] = True

swaggerui_blueprint = get_swaggerui_blueprint(
    "/docs/swagger",
    '/docs/swagger-docs.json',
    config={
        'app_name': "Advance API",
        "layout": "BaseLayout",
        "docExpansion": "none"
    },
)
app.register_blueprint(swaggerui_blueprint)


@app.route('/docs/swagger-docs.json')
def get_swagger():
    try:
        return send_from_directory(os.path.dirname(app.root_path), 'swagger-output.json')
    except FileNotFoundError:
        return jsonify({"error": "swagger-output.json not found"}), 404



if __name__ == '__main__':
    app.run(debug=True)
