# Deployment Guide for Railway with Custom Domain

This guide explains how to deploy your application to Railway with a custom domain from IONOS and proper SSL/HTTPS configuration.

## Overview

Your application uses:
- **GitHub**: Source code repository
- **Railway**: Hosting platform with automatic SSL termination and managed services
- **IONOS**: Custom domain registrar
- **Nginx**: Reverse proxy (bundled in the application container)

## Architecture

### Production Architecture (Railway)
Railway provides a simplified architecture:
1. **Railway Edge** - SSL termination and load balancing
2. **Application Container** - Nginx + Node.js app (port 8000 → 3000)
3. **Railway PostgreSQL** - Managed database service
4. **Railway Redis** - Managed cache service (optional)

Traffic flow:
1. Client connects to Railway's edge via HTTPS (port 443)
2. Railway terminates SSL and validates certificates
3. Railway forwards traffic to your container via HTTP (port 8000)
4. Nginx receives HTTP traffic and proxies to your app (port 3000)
5. App connects to Railway's managed PostgreSQL and Redis services

### Local Development Architecture (Docker Compose)
For local development, we use Docker Compose with multiple services:
- nginx, app, postgres, redis, minio, adminer

## Step 1: Create Railway Project and Services

### 1.1 Create New Project
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect and select your repository

### 1.2 Add PostgreSQL Service
1. In your Railway project, click "New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically create a `DATABASE_URL` environment variable
4. This will be automatically linked to your application

### 1.3 Add Redis Service (Optional)
1. Click "New" → "Database" → "Add Redis"
2. Railway will create a `REDIS_URL` environment variable
3. Link this to your application if you're using Redis

### 1.4 Configure Application Service
1. Railway should auto-detect the `railway.Dockerfile`
2. If not, go to Settings → Build and set:
   - **Builder**: Dockerfile
   - **Dockerfile Path**: `railway.Dockerfile`

## Step 2: Configure Environment Variables on Railway

In your Railway application service settings, add these environment variables:

### Required Variables
```env
NODE_ENV=production
BASE_URL=https://www.luviumcapital.com
ADMIN_PASSWORD=<your-secure-password>
JWT_SECRET=<your-secure-jwt-secret>
```

### Optional Variables
```env
OPENROUTER_API_KEY=<your-api-key-if-needed>
```

### Auto-Generated Variables (by Railway)
These are automatically created when you add services:
- `DATABASE_URL` - Created by PostgreSQL service
- `REDIS_URL` - Created by Redis service (if added)
- `PORT` - Railway sets this automatically (usually 8000)

**Important Notes:**
- `BASE_URL` must include `https://` and your custom domain
- Never use the default passwords in production - generate strong, unique values
- `DATABASE_URL` is automatically set by Railway's PostgreSQL service
- Railway automatically handles the `PORT` environment variable

### How to Set Environment Variables
1. Go to your application service in Railway
2. Click on "Variables" tab
3. Click "New Variable"
4. Add each variable with its value
5. Deploy after adding all variables

## Step 3: Configure Custom Domain on Railway

1. Go to your Railway application service
2. Click on "Settings" tab
3. Scroll to "Domains" section
4. Click "Generate Domain" to get a Railway subdomain (e.g., `your-app.up.railway.app`)
5. Click "Custom Domain"
6. Enter your custom domain: `www.luviumcapital.com`
7. Railway will show you the DNS records to configure

You'll see something like:
```
Type: CNAME
Name: www
Value: your-app.up.railway.app
```

## Step 4: Configure DNS on IONOS

1. Log in to your IONOS account
2. Go to Domain & SSL management
3. Select your domain `luviumcapital.com`
4. Navigate to DNS Settings
5. Add/Update the following DNS records:

### For www subdomain:
```
Type: CNAME
Host: www
Points to: your-app.up.railway.app
TTL: 3600 (or default)
```

### For root domain (optional):
If you want `luviumcapital.com` (without www) to also work:

**Option A: CNAME Flattening** (if IONOS supports it)
```
Type: CNAME
Host: @
Points to: your-app.up.railway.app
```

**Option B: A Record** (get IP from Railway support)
```
Type: A
Host: @
Points to: [Railway's IP address]
TTL: 3600
```

**Note**: DNS changes can take 24-48 hours to propagate, but usually work within 1-2 hours.

## Step 5: Verify SSL Certificate

After DNS propagation, Railway will automatically provision an SSL certificate from Let's Encrypt.

To verify:
1. Visit `https://www.luviumcapital.com` in your browser
2. Click the padlock icon in the address bar
3. Check that the certificate is valid and issued by Let's Encrypt
4. Verify the certificate covers your domain

## Step 6: Database Setup

Railway's PostgreSQL service is empty by default. You need to run migrations:

### Option A: Automatic (via startup script)
The application includes a `src/server/scripts/setup.ts` that runs on startup and can handle initial database setup.

### Option B: Manual (via Railway CLI)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run pnpm prisma migrate deploy

# Seed data if needed
railway run pnpm prisma db seed
```

## Step 7: Test the Deployment

### 7.1 Test HTTPS Connection
```bash
curl -I https://www.luviumcapital.com
```
Should return `HTTP/2 200` or similar

### 7.2 Test API Endpoints
```bash
# Test homepage
curl https://www.luviumcapital.com/

# Test tRPC endpoint (if you have a health check)
curl https://www.luviumcapital.com/trpc/health
```

### 7.3 Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Check for any errors or mixed content warnings
4. Verify all resources load via HTTPS

### 7.4 Test Application Features
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Forms submit successfully
- [ ] Database operations work
- [ ] Authentication works (if applicable)
- [ ] File uploads work (if applicable)

## Troubleshooting SSL Issues

### Issue: "SSL Certificate Error" or "Not Secure"

**Causes:**
1. DNS not yet propagated
2. Railway hasn't provisioned certificate yet
3. Wrong DNS configuration
4. Custom domain not properly added in Railway

**Solutions:**
1. Wait 1-2 hours for DNS propagation
2. Check Railway dashboard → Settings → Domains for certificate status
3. Verify DNS records match Railway's requirements exactly
4. Ensure `BASE_URL` in environment variables uses `https://`
5. Try removing and re-adding the custom domain in Railway

### Issue: "Mixed Content" Warnings

**Cause:** Application generating HTTP URLs instead of HTTPS

**Solution:**
1. Ensure `BASE_URL` environment variable is set to `https://www.luviumcapital.com`
2. Redeploy the application after updating environment variables
3. Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: "ERR_TOO_MANY_REDIRECTS"

**Cause:** Redirect loop between HTTP and HTTPS

**Solution:**
1. Check Nginx configuration has `proxy_set_header X-Forwarded-Proto $scheme;`
2. Ensure application respects `X-Forwarded-Proto` header
3. Don't force HTTPS redirects in Nginx (Railway handles this)
4. Check Railway logs for redirect patterns

### Issue: Application loads but API calls fail

**Cause:** `allowedHosts` in app.config.ts doesn't include your domain

**Solution:**
1. Verify `BASE_URL` environment variable is set correctly
2. The app automatically extracts the hostname from `BASE_URL`
3. Redeploy after updating environment variables
4. Check Railway logs for "Host header is invalid" errors

### Issue: "Database connection failed"

**Cause:** Database not properly configured or migrations not run

**Solution:**
1. Verify PostgreSQL service is running in Railway
2. Check `DATABASE_URL` environment variable exists
3. Run database migrations: `railway run pnpm prisma migrate deploy`
4. Check Railway logs for specific database errors
5. Verify PostgreSQL service is linked to your application

### Issue: "Port already in use" or container crashes

**Cause:** Multiple processes trying to use the same port

**Solution:**
1. Railway automatically sets the `PORT` environment variable
2. The `railway.Dockerfile` is configured to use port 8000 internally
3. Check Railway logs for specific error messages
4. Ensure no hardcoded ports in your application code

## Railway-Specific Configuration

### Port Configuration
- Railway assigns a `PORT` environment variable (usually 8000)
- Your `railway.Dockerfile` listens on port 8000 internally
- Nginx proxies from 8000 → 3000 (app)
- Railway maps port 8000 to port 443 (HTTPS) externally

### Build Process
The `railway.Dockerfile` uses multi-stage builds:
1. **Builder stage**: Installs dependencies and builds the application
2. **Production stage**: Creates optimized runtime image with nginx and app

### Health Checks
Railway uses the `healthcheckPath` configured in `railway.json`:
- Path: `/`
- Timeout: 100 seconds
- Your app should respond with 200 OK

### Logs and Monitoring
View logs in Railway dashboard:
1. Click on your application service
2. Go to "Deployments" tab
3. Click on the latest deployment
4. View real-time logs
5. Use "Logs" tab for historical logs

### Database Backups
Railway automatically backs up PostgreSQL:
- Daily automatic backups
- Point-in-time recovery available
- Access via Railway dashboard → PostgreSQL service → Backups

## Security Best Practices

### 1. Environment Variables
- ✅ All sensitive values set in Railway (not in code)
- ✅ Railway encrypts environment variables at rest
- ✅ Never commit `.env` file to Git
- ✅ Use strong, unique passwords and secrets

### 2. Database Security
- ✅ Railway PostgreSQL is private by default
- ✅ Only accessible from within your Railway project
- ✅ Use strong database passwords
- ✅ Regular backups enabled

### 3. HTTPS Configuration
- ✅ Railway automatically redirects HTTP to HTTPS
- ✅ `BASE_URL` always uses `https://`
- ✅ HSTS headers enabled by Railway
- ✅ TLS 1.2+ enforced

### 4. CORS Configuration
- ✅ `allowedHosts` restricts API access to your domain
- ✅ Automatically configured via `BASE_URL`
- ✅ No wildcard CORS in production

### 5. Secrets Management
Update these to strong, unique values:
```bash
# Generate a strong JWT secret (32+ characters)
openssl rand -base64 32

# Generate a strong admin password
openssl rand -base64 24
```

## Deployment Checklist

### Pre-Deployment
- [ ] GitHub repository is up to date
- [ ] All code is tested locally
- [ ] Environment variables documented
- [ ] Database schema is finalized

### Railway Setup
- [ ] Railway project created
- [ ] GitHub repository connected
- [ ] PostgreSQL service added
- [ ] Redis service added (if needed)
- [ ] Environment variables configured in Railway
- [ ] `BASE_URL` set to `https://www.luviumcapital.com`
- [ ] Strong passwords and secrets generated

### Domain Configuration
- [ ] Custom domain added in Railway settings
- [ ] DNS records configured in IONOS
- [ ] DNS propagation verified (`nslookup www.luviumcapital.com`)
- [ ] SSL certificate provisioned (check Railway dashboard)

### Testing
- [ ] HTTPS connection works
- [ ] No SSL certificate errors
- [ ] No mixed content warnings
- [ ] API endpoints respond correctly
- [ ] Database connections work
- [ ] All application features functional
- [ ] Mobile responsive
- [ ] Performance acceptable

### Post-Deployment
- [ ] Monitor Railway logs for errors
- [ ] Set up uptime monitoring
- [ ] Configure alerts in Railway
- [ ] Document deployment process
- [ ] Plan for database backups verification

## Monitoring and Maintenance

### Railway Monitoring
1. **Metrics**: Railway provides CPU, memory, and network metrics
2. **Logs**: Real-time and historical logs available
3. **Alerts**: Set up alerts for downtime or errors
4. **Usage**: Monitor database and Redis usage

### Uptime Monitoring
Consider using external monitoring services:
- [UptimeRobot](https://uptimerobot.com/) (free tier available)
- [Pingdom](https://www.pingdom.com/)
- [Better Uptime](https://betteruptime.com/)

### Regular Maintenance
- **Weekly**: Check Railway logs for errors
- **Monthly**: Review usage and costs
- **Quarterly**: Update dependencies and security patches
- **As needed**: Scale resources based on traffic

## Cost Considerations

### Railway Pricing
- **Starter Plan**: $5/month per service
- **PostgreSQL**: ~$5/month for small databases
- **Redis**: ~$5/month for small instances
- **Bandwidth**: Included in base price
- **Build minutes**: Generous free tier

### Estimated Monthly Cost
- Application service: $5
- PostgreSQL: $5
- Redis (optional): $5
- **Total**: $10-15/month

## Scaling Considerations

### Horizontal Scaling
Railway supports:
- Multiple replicas of your application
- Load balancing across replicas
- Configure in `railway.json`: `"numReplicas": 2`

### Vertical Scaling
Upgrade resources as needed:
- More CPU/RAM for application
- Larger PostgreSQL instances
- More Redis memory

### Database Scaling
- Start with smallest PostgreSQL instance
- Monitor usage in Railway dashboard
- Upgrade as needed (zero downtime)
- Consider read replicas for high traffic

## Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Railway Custom Domains Guide](https://docs.railway.app/guides/public-networking#custom-domains)
- [Railway PostgreSQL](https://docs.railway.app/databases/postgresql)
- [IONOS DNS Management](https://www.ionos.com/help/domains/)
- [Let's Encrypt SSL Certificates](https://letsencrypt.org/)
- [Prisma Documentation](https://www.prisma.io/docs/)

## Support

If you continue to experience issues:

1. **Check Railway Status**: [status.railway.app](https://status.railway.app)
2. **Railway Logs**: Check for specific error messages
3. **DNS Verification**: `nslookup www.luviumcapital.com`
4. **Railway Community**: [Discord](https://discord.gg/railway)
5. **Railway Support**: Help section in dashboard
6. **IONOS Support**: For DNS-related issues

## Quick Reference

### Environment Variables
| Variable | Value | Source |
|----------|-------|--------|
| `NODE_ENV` | `production` | Manual |
| `BASE_URL` | `https://www.luviumcapital.com` | Manual |
| `ADMIN_PASSWORD` | `<secure-password>` | Manual |
| `JWT_SECRET` | `<secure-secret>` | Manual |
| `DATABASE_URL` | `postgresql://...` | Auto (PostgreSQL service) |
| `REDIS_URL` | `redis://...` | Auto (Redis service) |
| `PORT` | `8000` | Auto (Railway) |

### Ports
| Service | Internal Port | External Port |
|---------|--------------|---------------|
| Nginx | 8000 | 443 (HTTPS) |
| App | 3000 | - |
| PostgreSQL | 5432 | - |
| Redis | 6379 | - |

### DNS Records
| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | www | your-app.up.railway.app | 3600 |
| CNAME/A | @ | your-app.up.railway.app or IP | 3600 |

## Deployment Summary

Your application is now configured for production deployment on Railway:

✅ **SSL/HTTPS**: Automatic via Railway's edge with Let's Encrypt  
✅ **Custom Domain**: www.luviumcapital.com  
✅ **Database**: Railway-managed PostgreSQL  
✅ **Cache**: Railway-managed Redis (optional)  
✅ **Reverse Proxy**: Nginx (bundled in container)  
✅ **Environment**: Production-optimized with proper secrets  

Once you complete the steps in this guide, your website will be accessible at:
- **Primary**: https://www.luviumcapital.com
- **Railway**: https://your-app.up.railway.app

Both URLs will serve your application over HTTPS with valid SSL certificates.
