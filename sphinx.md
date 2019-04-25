For creating necessary rst and make files, run the following command:

    $ sphinx-apidoc -o ./docs ./src --full

In sphinx *conf.py*, add following lines (do not delete *conf.py* file content just replace this code with the project information):

    import os
    import sys
    basedir = os.path.abspath("..")
    sys.path.append(basedir)

    project = 'Asset Tokenization DApp'
    copyright = '2019, Bigdata Teknoloji'
    author = 'Bigdata Teknoloji'

Then, run the following commands:

    $ cd docs
    $ make html
