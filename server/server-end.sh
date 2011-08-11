#!/bin/bash
#
# Stops the server
#

pid=`ps -eo pid,args | grep "node main\.js --sculptly" | grep -o "^[ ]*[0-9]*"`
sudo kill $pid

