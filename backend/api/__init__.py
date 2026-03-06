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

    # Disable Flask's built-in file caching so send_from_directory never returns 304
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

    # Enable CORS for local development
    CORS(app, origins=[BASE_URL, 'http://localhost:3000'])

    # 1. Register the API Blueprint FIRST.
    # This must be done before the catch-all route to ensure API requests are prioritized.
    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    # Force no-caching on all /api responses so the browser never serves stale data
    @app.after_request
    def add_no_cache_headers(response):
        if request.path.startswith('/api/'):
            response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
            response.headers['Pragma'] = 'no-cache'
            response.headers['Expires'] = '0'
        return response

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
    #    Hashed filenames (e.g. main.abc123.js) are safe to cache long-term.
    @app.route('/static/<path:filename>')
    def serve_static(filename):
        return send_from_directory(os.path.join(app.template_folder, 'static'), filename)

    # 5. Define the catch-all route for the React app.
    #    index.html must never be cached so new deployments are always picked up.
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.template_folder, path)):
            return send_from_directory(app.template_folder, path)
        else:
            response = send_from_directory(app.template_folder, 'index.html')
            response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
            response.headers['Pragma'] = 'no-cache'
            response.headers['Expires'] = '0'
            return response

    return app