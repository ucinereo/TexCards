#!/bin/bash

echo "uploading to server"
scp -i ~/.ssh/id_rsa dist/tex-cards/* gawain@173.249.57.161:/home/gawain/receive/html/files