#!/bin/bash
#
# Installs all the required parts for the server.
#

# Node and prerequisits
sudo apt-add-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get -y install python-software-properties nodejs curl

# Node Package Manager
sudo sh
curl http://npmjs.org/install.sh | sh
exit

# Required Node packages
npm install mysql

