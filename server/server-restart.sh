#!/bin/bash
#
# Restarts the server
#
# NOTE: If the server fails to shutdown it will not start up again with this
#       script.
#

./server-end.sh && ./server-start.sh
