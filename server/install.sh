#!/bin/bash
#
# Installs all the required parts for the server.
#

# Node and prerequisits
echo " ### Installing Node.js and prerequisits ###"
sudo apt-add-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get -y install python-software-properties nodejs curl

# Node Package Manager
echo " ### Installing NPM ###"
curl http://npmjs.org/install.sh | sudo sh

# Required Node packages
echo " ### Installing required packages ###"
npm install mongodb

