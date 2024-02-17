#!/bin/bash

REPO_DIR="/var/www/html/emc-api"
PM2_REPO="emc-api"

# Ensure the script fails if any command fails
set -e

# Change directory
echo "Changing directory $REPO_DIR"
cd $REPO_DIR

echo "Fetching the latest changes from the Git repository..."
git reset --hard
git pull
echo "Git pulled successfully."

echo "Installing  dependencies..."
npm install
echo "Dependencies installed successfully."

echo "Restart PM2"
pm2 restart "$PM2_REPO" --update-env 
echo "Restarted successfully."