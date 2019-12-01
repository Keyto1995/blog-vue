#!/bin/bash
SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
docker build --rm -t keyto/blog-vue:latest $SCRIPTPATH
