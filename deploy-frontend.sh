#!/bin/bash

# export NODE_OPTIONS=--openssl-legacy-provider

cd ./Front-End && npm run build
cd ..
git checkout --orphan gh-pages
git --work-tree ./Front-End/dist add --all
git --work-tree ./Front-End/dist commit -m gh-pages
git push origin HEAD:gh-pages --force
rm -r ./Front-End/dist