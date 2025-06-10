#!/bin/bash

# SSL setup script using Let's Encrypt
# Run this after setting up Nginx

DOMAIN=${1:-"your-domain.com"}

if [ "$DOMAIN" = "your-domain.com" ]; then
    echo "❌ Please provide your domain name"
    echo "Usage: ./ssl-setup.sh your-domain.com"
    exit 1
fi

echo "🔒 Setting up SSL for domain: $DOMAIN"

# Install Certbot
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN

# Set up auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test auto-renewal
sudo certbot renew --dry-run

echo "✅ SSL setup complete!"
echo "🔒 Your site is now secured with HTTPS"
echo "🔄 Auto-renewal is configured"

# Update Nginx config to include SSL redirects
sudo nginx -t && sudo systemctl reload nginx

echo "🌐 Your app should now be accessible at https://$DOMAIN"
