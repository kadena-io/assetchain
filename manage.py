"""This module runs the application on a local development server.

Functions:
    - **__name__:** Main function.
"""

from src import create_app

app = create_app('default')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5006)
