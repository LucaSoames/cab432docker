# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory for the app
WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy both backend and frontend code
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Expose ports for the backend and frontend
EXPOSE 3000 3001

# Copy and make the shell script executable
COPY start.sh ./
RUN chmod +x ./start.sh

# Start both the backend and frontend
CMD ["./start.sh"]
