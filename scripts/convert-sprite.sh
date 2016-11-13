#!/usr/bin/sh
convert "$1[0]"  -resize 100x100 -gravity center -background transparent -extent 100x100 "$2"
