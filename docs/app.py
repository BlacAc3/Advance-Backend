from flask import Flask, jsonify, send_from_directory
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
import os

app = Flask(__name__)
app.config['PROPAGATE_EXCEPTIONS'] = True

swaggerui_blueprint = get_swaggerui_blueprint(
    "/docs/swagger",
    'https://advance-backend.vercel.app/docs/swagger.json',
    config={
        'app_name': "Advance API",
        "layout": "BaseLayout",
        "docExpansion": "none"
    },
)
app.register_blueprint(swaggerui_blueprint)





if __name__ == '__main__':
    app.run(debug=True)
