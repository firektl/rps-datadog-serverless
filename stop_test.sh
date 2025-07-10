#!/bin/sh
kill -9 $(ps -ef | grep test_bucle.sh | grep -v grep | awk '{print $2}')
