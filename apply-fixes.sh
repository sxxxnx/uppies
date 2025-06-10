#!/bin/bash

echo "🚀 Applying production fixes..."

# 1. Reload Nginx with new configuration
echo "📝 Reloading Nginx configuration..."
sudo nginx -t && sudo systemctl reload nginx

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration reloaded successfully"
else
    echo "❌ Nginx configuration error. Please check the config."
    exit 1
fi

# 2. Restart Docker container to apply any code changes
echo "🔄 Restarting Docker container..."
docker-compose down
docker-compose up -d --build

if [ $? -eq 0 ]; then
    echo "✅ Docker container restarted successfully"
else
    echo "❌ Docker container failed to start"
    exit 1
fi

# 3. Wait for application to be ready
echo "⏳ Waiting for application to be ready..."
sleep 10

# 4. Test the application
echo "🧪 Testing application..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Application is responding"
else
    echo "❌ Application is not responding"
    echo "📋 Checking logs..."
    docker-compose logs --tail=20
fi

echo "🎉 Deployment fixes applied!"
echo ""
echo "📊 Status check:"
echo "- Nginx: $(systemctl is-active nginx)"
echo "- Docker: $(docker-compose ps --services --filter status=running)"
echo ""
echo "🔧 To monitor:"
echo "- App logs: docker-compose logs -f"
echo "- Nginx logs: sudo tail -f /var/log/nginx/error.log"
echo "- System: htop"
