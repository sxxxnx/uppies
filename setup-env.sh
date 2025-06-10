#!/bin/bash

# Environment setup script for DigitalOcean deployment
# Run this to set up your production environment variables

echo "🔧 Setting up environment variables for production..."

# Create .env file for production
cat > .env.production << 'EOF'
NODE_ENV=production
PORT=3000

# Appwrite Configuration
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=your_database_id

# Add your other environment variables here
# Replace the placeholder values with your actual values

EOF

echo "📝 Created .env.production file"
echo "⚠️  IMPORTANT: Update the .env.production file with your actual values"
echo "🔐 Make sure to secure your API keys and never commit them to version control"

# Set up proper permissions
chmod 600 .env.production

# Create logs directory for PM2
mkdir -p logs

echo "✅ Environment setup complete!"
echo "📋 Next steps:"
echo "   1. Edit .env.production with your actual values"
echo "   2. Source the environment variables: source .env.production"
echo "   3. Start the application: pm2 start ecosystem.config.js"
