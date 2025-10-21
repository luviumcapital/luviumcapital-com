# Railway Deployment Checklist

Quick reference checklist for deploying to Railway with custom domain and SSL.

## Pre-Deployment

- [ ] Code is tested and working locally
- [ ] All changes committed to GitHub
- [ ] Environment variables documented
- [ ] Database schema finalized

## Railway Setup

### 1. Create Project & Services

- [ ] Create new Railway project
- [ ] Connect GitHub repository
- [ ] Add PostgreSQL database service
- [ ] Add Redis service (if needed)
- [ ] Verify `railway.Dockerfile` is detected

### 2. Environment Variables

Set these in Railway → Variables:

- [ ] `NODE_ENV=production`
- [ ] `BASE_URL=https://www.luviumcapital.com`
- [ ] `ADMIN_PASSWORD=<strong-password>`
- [ ] `JWT_SECRET=<secure-secret>`
- [ ] `OPENROUTER_API_KEY=<your-key>` (if needed)

Auto-generated (verify they exist):
- [ ] `DATABASE_URL` (from PostgreSQL service)
- [ ] `REDIS_URL` (from Redis service, if added)
- [ ] `PORT` (Railway sets automatically)

### 3. Custom Domain

- [ ] Generate Railway domain first (e.g., `your-app.up.railway.app`)
- [ ] Add custom domain in Railway: `www.luviumcapital.com`
- [ ] Note the CNAME record provided by Railway

## DNS Configuration (IONOS)

- [ ] Log in to IONOS
- [ ] Go to Domain & SSL → DNS Settings
- [ ] Add CNAME record:
  - Type: `CNAME`
  - Host: `www`
  - Points to: `your-app.up.railway.app`
  - TTL: `3600`
- [ ] (Optional) Add root domain record:
  - Type: `CNAME` or `A`
  - Host: `@`
  - Points to: `your-app.up.railway.app` or IP
  - TTL: `3600`
- [ ] Save DNS changes

## Verification

### DNS Propagation (wait 1-2 hours)

```bash
# Check DNS
nslookup www.luviumcapital.com

# Should return Railway's IP or CNAME
```

- [ ] DNS resolves to Railway

### SSL Certificate

- [ ] Check Railway dashboard → Domains → Certificate status
- [ ] Should show "Active" with Let's Encrypt
- [ ] Visit `https://www.luviumcapital.com`
- [ ] Click padlock icon → Certificate is valid

### Application Testing

- [ ] Homepage loads: `https://www.luviumcapital.com`
- [ ] No SSL warnings in browser
- [ ] No mixed content warnings (check console)
- [ ] API endpoints work
- [ ] Database connections work
- [ ] All features functional

### Database Setup

- [ ] Migrations run successfully
- [ ] Initial data seeded (if needed)
- [ ] Database accessible from app

```bash
# Using Railway CLI
railway run pnpm prisma migrate deploy
```

## Post-Deployment

- [ ] Monitor Railway logs for errors
- [ ] Test all critical user flows
- [ ] Verify mobile responsiveness
- [ ] Check performance metrics
- [ ] Set up uptime monitoring (optional)
- [ ] Configure Railway alerts

## Troubleshooting Quick Fixes

### SSL Certificate Error
1. Wait 2 hours for DNS propagation
2. Check `BASE_URL` has `https://`
3. Verify DNS CNAME is correct
4. Try removing/re-adding domain in Railway

### Mixed Content Warnings
1. Verify `BASE_URL=https://...` in Railway
2. Redeploy application
3. Clear browser cache (Ctrl+Shift+R)

### API Calls Fail
1. Check `BASE_URL` environment variable
2. Verify allowedHosts in app.config.ts
3. Check Railway logs for errors

### Database Connection Failed
1. Verify PostgreSQL service is running
2. Check `DATABASE_URL` exists
3. Run migrations: `railway run pnpm prisma migrate deploy`
4. Check service is linked to app

## Environment Variable Reference

| Variable | Value | Required |
|----------|-------|----------|
| `NODE_ENV` | `production` | ✅ Yes |
| `BASE_URL` | `https://www.luviumcapital.com` | ✅ Yes |
| `ADMIN_PASSWORD` | Strong password | ✅ Yes |
| `JWT_SECRET` | 32+ char secret | ✅ Yes |
| `OPENROUTER_API_KEY` | API key | ⚠️ If used |
| `DATABASE_URL` | Auto-generated | ✅ Auto |
| `REDIS_URL` | Auto-generated | ⚠️ If used |
| `PORT` | Auto-generated | ✅ Auto |

## Security Checklist

- [ ] Strong, unique `ADMIN_PASSWORD` set
- [ ] Cryptographically secure `JWT_SECRET`
- [ ] `.env` file not committed to Git
- [ ] All secrets set in Railway (not in code)
- [ ] `BASE_URL` uses `https://`
- [ ] CORS properly configured via `allowedHosts`

## Success Criteria

✅ Website loads at `https://www.luviumcapital.com`  
✅ Valid SSL certificate (no browser warnings)  
✅ All pages and features work  
✅ API calls succeed  
✅ Database operations work  
✅ No console errors  
✅ Mobile responsive  
✅ Performance acceptable  

## Next Steps After Deployment

1. **Monitor** - Check Railway logs regularly
2. **Backup** - Verify database backups are working
3. **Scale** - Adjust resources based on traffic
4. **Update** - Keep dependencies current
5. **Document** - Record any custom configurations

## Quick Commands

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and link
railway login
railway link

# View logs
railway logs

# Run migrations
railway run pnpm prisma migrate deploy

# Access database
railway run pnpm prisma studio

# Deploy manually
railway up
```

## Support Resources

- 📖 [Full Deployment Guide](./DEPLOYMENT.md)
- 🚂 [Railway Docs](https://docs.railway.app/)
- 🔧 [Railway Discord](https://discord.gg/railway)
- 🌐 [IONOS Help](https://www.ionos.com/help/)

---

**Last Updated**: After SSL configuration fix  
**Status**: Ready for production deployment ✅
