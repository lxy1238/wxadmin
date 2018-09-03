#!/bin/bash
root=$(cd "$(dirname "$0")"; pwd)
# rsync -avz --delete  $root/dist mogu:/project/ 
rsync -avz --delete  dist  mogu:/project/