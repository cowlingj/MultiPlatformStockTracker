#!/usr/bin/env bash

BROWSERS=("xdg-open" "firefox" "google-chrome-stable" "google-chrome")

echo URL: $URL

for CMD in "${BROWSERS[@]}"; do
  which "${CMD[0]}" > /dev/null && $CMD "file://$(pwd)/$URL" && break
done
