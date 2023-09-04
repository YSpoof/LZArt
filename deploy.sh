#!/usr/bin/env bash
set -e

today=$(date)

git add .
git commit -a -m "SYNC - $today"
git push