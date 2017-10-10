#!/bin/bash

rsync -azhv -e "ssh" --progress /home/ubuntu/workspace/build/ westropp@westroppstudios.com:~/public_html/corywestropp\.com/develop/ --delete