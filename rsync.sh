#!/bin/bash
root=$(cd "$(dirname "$0")"; pwd)
rsync -avz -e ssh $root/dist mogu:/project/ --exclude vendor/ --exclude .git  --exclude storage --exclude .env --delete
