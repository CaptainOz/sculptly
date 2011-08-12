#!/bin/bash
#
# Updates Ubuntu as well as the node modules.
#

# First update Ubuntu
sudo apt-get update     # Update repository listings
sudo apt-get upgrade    # Install any software updates

# Then update the node modules
npm update npm -g   # Update npm itself
npm update -g       # Update global packages
npm update          # Update local packages

