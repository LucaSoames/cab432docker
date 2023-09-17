#!/bin/bash

# Start the Node.js server in the background
node backend/server.js &

# Start the React app
cd frontend
npm start
