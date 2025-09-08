import os
from flask import Flask, send_from_directory, request
from flask_cors import CORS

BASE_URL = "https://datanalytics.worldbank.org/content/5b7c203b-ee6f-4bc5-87df-9492e61a2bb9/"
# Define the absolute path to the React build folder.
REACT_BUILD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'build')

def create_app():
    # Configure Flask to serve static files from the build/static folder
    # and templates (including index.html) from the build folder.
    app = Flask(__name__, static_folder=os.path.join(REACT_BUILD_DIR, 'static'), template_folder=REACT_BUILD_DIR)
    
    # Enable CORS for local development
    CORS(app, origins=[BASE_URL, 'http://localhost:3000'])

    # 1. Register the API Blueprint FIRST.
    # This must be done before the catch-all route to ensure API requests are prioritized.
    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    # 2. Add an explicit route for manifest.json and favicon.ico.
    @app.route('/manifest.json')
    @app.route('/favicon.ico')
    def serve_manifest_and_favicon():
        return send_from_directory(app.template_folder, request.path[1:])

    # 3. Add a specific route for the 'media' folder to resolve the 404 errors.
    @app.route('/static/media/<path:filename>')
    def serve_media(filename):
        return send_from_directory(os.path.join(app.template_folder, 'static', 'media'), filename)

    # 4. Add a generic route for other static assets (CSS, JS).
    @app.route('/static/<path:filename>')
    def serve_static(filename):
        return send_from_directory(os.path.join(app.template_folder, 'static'), filename)

    # 5. Define the catch-all route for the React app.
    # This route will only be hit if no other routes (like the API or static routes) match.
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.template_folder, path)):
            return send_from_directory(app.template_folder, path)
        else:
            return send_from_directory(app.template_folder, 'index.html')

    return app