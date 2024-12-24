#!/bin/bash

# Install dependencies
npm install

# Create logs directory
mkdir -p logs

# Start the bot in production mode
npm run bot:prod

# Save PM2 process list
npm run bot:save

# Setup PM2 startup script
npm run bot:startup