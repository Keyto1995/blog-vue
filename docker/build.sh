#!/bin/bash
SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
docker build --rm --no-cache -t keyto/blog-vue:latest $SCRIPTPATH
