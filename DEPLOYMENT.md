# 🚀 DigitalOcean Deployment Guide for Uppies

This guide covers multiple deployment options for your Uppies app on DigitalOcean.

## 🎯 Deployment Options

### Option 1: DigitalOcean App Platform (Recommended for beginners)
### Option 2: DigitalOcean Droplet (More control, manual setup)

---

## 🔧 Option 1: App Platform Deployment

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Ensure all environment variables are documented

### Step 2: Create App Platform App
1. Go to DigitalOcean control panel
2. Click "Apps" → "Create App"
3. Connect your GitHub repository
4. Use the provided `.do/app.yaml` configuration

### Step 3: Configure Environment Variables
In the App Platform dashboard, add these environment variables:
```
NODE_ENV=production
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_COLLECTION_ID=your_collection_id
APPWRITE_STORAGE_ID=your_storage_id
```

### Step 4: Deploy
- App Platform will automatically build and deploy your app
- Monitor the build logs for any issues

---

## 🖥️ Option 2: Droplet Deployment

### Prerequisites
- DigitalOcean Droplet (Ubuntu 20.04+ recommended)
- Domain name pointed to your droplet
- SSH access to your droplet

### Step 1: Initial Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git nginx ufw

# Configure firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Step 2: Install Node.js and Bun

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Install PM2 process manager
sudo npm install -g pm2
```

### Step 3: Deploy Your Application

```bash
# Clone your repository
cd /var/www
sudo git clone https://github.com/your-username/uppies.git
sudo chown -R $USER:$USER /var/www/uppies
cd uppies

# Make scripts executable
chmod +x *.sh

# Set up environment
./setup-env.sh
# Edit .env.production with your actual values
nano .env.production

# Install dependencies and build
bun install
bun run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 4: Configure Nginx

```bash
# Copy Nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/uppies

# Update domain in the config file
sudo nano /etc/nginx/sites-available/uppies
# Change "your-domain.com" to your actual domain

# Enable the site
sudo ln -s /etc/nginx/sites-available/uppies /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

### Step 5: Set up SSL

```bash
# Run SSL setup script
./ssl-setup.sh your-domain.com
```

---

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use strong, unique API keys
- Rotate keys regularly

### Server Security
```bash
# Disable root login
sudo nano /etc/ssh/sshd_config
# Set PermitRootLogin no

# Enable automatic security updates
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades

# Set up fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

### Application Security
- Rate limiting is configured in Nginx
- Security headers are included
- File upload limits are set

---

## 📊 Monitoring & Maintenance

### PM2 Commands
```bash
# View status
pm2 status

# View logs
pm2 logs uppies

# Restart app
pm2 restart uppies

# Monitor in real-time
pm2 monit
```

### Nginx Commands
```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
bun install
bun run build
pm2 restart uppies
```

---

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   sudo lsof -i :3000
   sudo kill -9 PID
   ```

2. **PM2 not starting**
   ```bash
   pm2 delete all
   pm2 start ecosystem.config.js
   ```

3. **Nginx 502 Bad Gateway**
   - Check if app is running: `pm2 status`
   - Check Nginx config: `sudo nginx -t`
   - Check logs: `pm2 logs`

4. **Environment variables not loaded**
   ```bash
   source .env.production
   pm2 restart uppies --update-env
   ```

### Log Locations
- PM2 logs: `~/.pm2/logs/`
- Nginx logs: `/var/log/nginx/`
- Application logs: `./logs/`

---

## 📈 Performance Optimization

### Enable Gzip (already in Nginx config)
### Use PM2 clustering (already configured)
### Static asset caching (already configured)

### Database Optimization
- Consider connection pooling for Appwrite
- Monitor query performance
- Set up database indexes

---

## 🔄 CI/CD Setup (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to DigitalOcean

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /var/www/uppies
          git pull origin main
          bun install
          bun run build
          pm2 restart uppies
```

---

## 💰 Cost Estimation

### App Platform
- Basic: $5/month (512 MB RAM, 1 vCPU)
- Pro: $12/month (1 GB RAM, 1 vCPU)

### Droplet
- Basic: $4/month (512 MB RAM, 1 vCPU, 10 GB SSD)
- Standard: $6/month (1 GB RAM, 1 vCPU, 25 GB SSD)

---

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Verify environment variables
3. Test locally with production build
4. Check DigitalOcean status page
5. Review this guide for missed steps

Good luck with your deployment! 🚀
