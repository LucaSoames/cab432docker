# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory for the app
WORKDIR /app

# Install backend dependencies
COPY app/backend/package.json ./backend/
COPY app/backend/package-lock.json ./backend/
RUN cd backend && npm install

# Install frontend dependencies
COPY app/frontend/package.json ./frontend/
COPY app/frontend/package-lock.json ./backend/
RUN cd frontend && npm install

# Copy both backend and frontend code
COPY app/backend/ ./backend/
COPY app/frontend/ ./frontend/

# Expose ports for the backend and frontend
EXPOSE 3000 3001

# Copy and make the shell script executable
COPY start.sh ./
RUN chmod +x ./start.sh

# Start both the backend and frontend
CMD ["./start.sh"]
