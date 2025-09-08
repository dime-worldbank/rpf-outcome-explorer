from api import create_app
# Create an instance of the Flask app
app = create_app()

if __name__ == '__main__':
    # Run the app in debug mode for development
        # Import and register the Blueprint from routes.py

    app.run('localhost', port=5000)