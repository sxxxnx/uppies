#!/bin/bash

# DigitalOcean Droplet Deployment Script
# Run this on your droplet to deploy the app

set -e

echo "🚀 Starting deployment process..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Create app directory
sudo mkdir -p /var/www/uppies
sudo chown $USER:$USER /var/www/uppies

# Clone or copy your app (update with your repo)
cd /var/www/uppies
# git clone https://github.com/your-username/uppies.git .

# Install dependencies
bun install

# Build the application
bun run build

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'uppies',
    script: 'build/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ App deployed successfully!"
echo "🌐 Your app should be running on port 3000"
echo "📋 Next steps:"
echo "   1. Set up Nginx reverse proxy"
echo "   2. Configure SSL with Let's Encrypt"
echo "   3. Set up your environment variables"
