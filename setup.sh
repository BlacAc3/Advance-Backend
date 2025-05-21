#!/bin/bash

# Create necessary directories
mkdir -p src/{config,controllers,middleware,models,routes,services/blockchain,types,utils}
mkdir -p logs
mkdir -p tests

# Install dependencies
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file from .env.example"
    echo "Please update the .env file with your configuration"
fi

# Create logs directory and set permissions
touch logs/app.log
touch logs/error.log

# Initialize git repository if not already initialized
if [ ! -d .git ]; then
    git init
    echo "node_modules/" > .gitignore
    echo "dist/" >> .gitignore
    echo "logs/" >> .gitignore
    echo ".env" >> .gitignore
    git add .
    git commit -m "Initial commit"
fi

echo "Setup completed successfully!"
echo "Next steps:"
echo "1. Update the .env file with your configuration"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Check the health endpoint at http://localhost:3000/api/v1/health" 