#!/bin/sh

# Deploy the server
# This script is meant to be run from the root of the project
# Run this script with sudo or admistrator privileges if needed

cd server || exit
docker compose build --no-cache && docker compose up -d