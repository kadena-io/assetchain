## Asset Tokenization DApp Execution Steps

1 - Using pipenv to run:

- If you're on MacOS, you can install Pipenv easily with Homebrew:

      $ brew install pipenv

- Linux based OS

      $ pip install --user pipenv

- Windows OS
  Download pip install file https://bootstrap.pypa.io/get-pip.py

      $ python get-pip.py
      $ pip install --user pipenv

2 - Running Pact server and initializing the Chain and uploading smart contracts to pact server (for Ubuntu and MacOS, On Windows skip this step):

    $ cd pact
    $ ./runpactserver.sh

    # run on a new terminal
    $ cd pact
    $ ./initchain.sh

3 - On Windows with Docker (for Windows, On Ubuntu or MacOS skip this step) - In DockerFiles folder right click doc.ps1 file and select "Run with PowerShell"

4 - After installation move to project directory and run following command to create a virtual environment

    $ pipenv --python 3.6

    # activate virtualenv and install requirements

    $ pipenv shell
    $ pipenv install

Running development server:

    (activated-venv)$ python manage.py

## Asset Tokenization DApp Structure

    .
    ├── config.py
    ├── manage.py
    ├── pact
    │   ├── code
    │   │   └── assettokenizaton_v010.pact
    │   ├── initchain.sh
    │   ├── log
    │   ├── runpactserver.sh
    │   └── yamls
    │       ├── config.yaml
    │       └── initialization.yaml
    ├── Pipfile
    ├── Pipfile.lock
    ├── README.md
    ├── ui
    └── src

- config.py: stores the configuration settings
- manage.py: launches the application and the other application tasks
- pact: stores pact smart contracts, yaml files and shell scripts
- src: stores python application source code
- Pipfile: lists the package dependencies so that it is easy to regenerate an identical virtual environment on a different computer.
- ui: stores react web application

5 - Run React web application (make sure you have **npm**):

    $ cd ui
    $ npm install
    $ npm start

### NOTE: If you want to run React UI and Python app on different ip then you need to change ip address.

- React UI uses python app as backend so change backend ip address for react in `package.json` as follow: `"proxy": "http://<ip-address>:<PORT>"`
- Python app uses Pact API server, to change ip address for Pact edit `config.py` file as follow: `PACT_SERVER = 'http://<ip-address>:<PORT>/api/v1/'`

### Alternatives for pipenv

If you have any problem with pipenv you can use virtualenv package

    $ pip install virtualenv
    $ virtualenv --python=python3.6 venv
    # activate
    $ source venv/bin/activate
    $ pip install -r requirements.txt

If still there is problem with installing virtualenv, use python's default virtualenv module:

    $ python3.6 -m venv env
    # activate
    $ source env/bin/activate
    $ pip install -r requirements.txt
