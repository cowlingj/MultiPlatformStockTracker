#!/usr/bin/env bash

function cleanup {
  [ -n "$1" ] && [ -d "$1" ] && rm -rf "$1"
}

LIB_DIR="lib"
PREFIX="$(pwd)/$LIB_DIR"
VERSION="v4.9.0"
GIT_URL="https://github.com/facebook/watchman.git"

[ -f "$LIB_DIR/bin/watchman" ] && echo "watchman already detected" >& 2 && exit 0

(
  set -e

  [ ! -d "$LIB_DIR" ] && mkdir "$LIB_DIR"

  trap '' EXIT
  TMP_DIR="$(mktemp --directory "/tmp/watchman-install-artifacts.XXXXXXXXXX")"
  trap "cleanup $TMP_DIR" EXIT

  git clone "$GIT_URL" "$TMP_DIR"
  cd "$TMP_DIR"
  git checkout "$VERSION"

  ./autogen.sh
  ./configure --enable-lenient --prefix="$PREFIX"
  make
  make install
)

[ "$?" != "0" ] && echo "build failed, cleaning up..." >& 2

cleanup "$TMP_DIR"