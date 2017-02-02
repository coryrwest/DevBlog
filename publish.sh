#!/bin/bash

rsync -azhv -e "ssh -p 2222" --progress /home/ubuntu/workspace/build/ westropp@westroppstudios.com:~/public_html/corywestropp\.com/develop/ --delete