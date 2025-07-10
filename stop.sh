#!/bin/sh
kill -9 $(ps -ef | grep rpsweb | grep -v grep | awk '{print $2}')
