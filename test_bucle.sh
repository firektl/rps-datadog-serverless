#!/bin/bash
while :
do
    for i in 0 1 2
    do
        curl "http://localhost:8080/play?c=$i"
    done
done