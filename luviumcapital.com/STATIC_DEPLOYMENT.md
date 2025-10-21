# Static Site Deployment Guide

This application has been converted to a static site that can be easily deployed to various hosting platforms without requiring a backend server, database, or complex infrastructure.

## What Changed

The application now runs as a pure client-side Single Page Application (SPA):

- ✅ **No backend server required** - All tRPC, Prisma, and server-side code removed
- ✅ **No database needed** - PostgreSQL/Prisma dependencies eliminated
- ✅ **No authentication backend** - Login/register pages show demo notices
- ✅ **Contact form uses mailto** - Opens email client instead of server submission
- ✅ **All pages publicly accessible** - No authentication gates
- ✅ **Static HTML/CSS/JS output** - Can be served from any static host

## Building the Static Site

```bash
# Install dependencies
pnpm install

# Build for production
pnpm build
```

The build output will be in the `.output/public` directory. This contains all the static files needed to deploy your site.

## Deployment Options

### 1. GitHub Pages

**Step 1: Build the site**
```bash
pnpm build
```

**Step 2: Configure GitHub Pages**
1. Push your code to GitHub
2. Go to Settings > Pages
3. Select "GitHub Actions" as the source
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./.output/public
```

**Step 3: Configure base path (if needed)**
If your site is at `username.github.io/repo-name`, you may need to configure the base path in `app.config.ts`.

### 2. Cloudflare Pages

**Option A: Git Integration (Recommended)**

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to Pages > Create a project
3. Connect your Git repository
4. Configure build settings:
   - **Build command:** `pnpm build`
   - **Build output directory:** `.output/public`
   - **Root directory:** `/` (or leave empty)
5. Click "Save and Deploy"

**Option B: Direct Upload**

```bash
# Install Wrangler CLI
pnpm add -g wrangler

# Build the site
pnpm build

# Deploy
wrangler pages deploy .output/public --project-name=luvium-capital
```

**Environment Variables:** None required for static deployment!

### 3. Railway

**Option A: Using Railway CLI**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

**Option B: Using GitHub Integration**

1. Go to [Railway](https://railway.app)
2. Click "New Project" > "Deploy from GitHub repo"
3. Select your repository
4. Configure settings:
   - **Build Command:** `pnpm build`
   - **Start Command:** Leave empty (static site)
   - **Root Directory:** `/`
5. Add a static site service configuration

**railway.json** (already configured):
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "startCommand": "echo 'Static site - no start command needed'"
  }
}
```

### 4. Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Or use the Vercel dashboard to connect your Git repository.

**Build Settings:**
- **Build Command:** `pnpm build`
- **Output Directory:** `.output/public`

### 5. Netlify

**Option A: Netlify CLI**

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Build
pnpm build

# Deploy
netlify deploy --prod --dir=.output/public
```

**Option B: Git Integration**

1. Connect your repository to Netlify
2. Configure build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `.output/public`

**netlify.toml** (optional):
```toml
[build]
  command = "pnpm build"
  publish = ".output/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Custom Domain Setup

After deploying to any platform:

1. Add your custom domain in the hosting platform's dashboard
2. Update your DNS records:
   - For Cloudflare Pages: Add CNAME record pointing to `<project>.pages.dev`
   - For GitHub Pages: Add CNAME record pointing to `<username>.github.io`
   - For Vercel/Netlify: Follow their DNS configuration instructions

## Features & Limitations

### ✅ What Works
- All pages and navigation
- Responsive design and UI components
- Contact form (opens email client)
- All informational content
- Investor dashboard (public demo version)
- Document access page (shows contact info)

### ⚠️ What's Changed
- **Login/Register**: Show demo notices, forms are disabled
- **Contact Form**: Uses `mailto:` instead of server submission
- **Document Downloads**: Link to contact page instead of actual downloads
- **Authentication**: All pages are publicly accessible

### 💡 To Add Real Functionality

If you need real authentication or form submissions:

1. **Authentication**: Use a service like:
   - Auth0
   - Firebase Authentication
   - Clerk
   - Supabase Auth

2. **Form Submissions**: Use a service like:
   - Formspree
   - Netlify Forms
   - Basin
   - Web3Forms

3. **Document Storage**: Use:
   - Cloudflare R2
   - AWS S3 with CloudFront
   - Direct links to public files

## Troubleshooting

### Build Fails

If the build fails, ensure:
- All dependencies are installed: `pnpm install`
- Node version is 18 or higher
- No import errors from removed server code

### 404 Errors on Routes

Most static hosts need SPA configuration:

**Cloudflare Pages**: Add `_redirects` file:
```
/* /index.html 200
```

**Netlify**: Add to `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel**: Automatically handled by Vercel

### Email Client Not Opening

The contact form uses `mailto:` links. If users report issues:
1. Ensure they have a default email client configured
2. Consider adding Formspree or similar service as alternative
3. Always show the email address so users can copy it manually

## Performance Optimization

The static site is already optimized, but you can further improve:

1. **Enable CDN caching** (automatic on most platforms)
2. **Add Cloudflare in front** for additional caching and DDoS protection
3. **Compress images** in the `/public` directory
4. **Enable Brotli compression** (usually automatic)

## Monitoring

Since this is a static site, you can use:
- **Google Analytics** - Add to `index.html`
- **Cloudflare Analytics** - Built-in if using Cloudflare
- **Plausible Analytics** - Privacy-friendly alternative
- **Vercel Analytics** - If deploying to Vercel

## Cost

All recommended platforms offer generous free tiers:
- **GitHub Pages**: Free for public repositories
- **Cloudflare Pages**: Free (500 builds/month)
- **Vercel**: Free (100GB bandwidth/month)
- **Netlify**: Free (100GB bandwidth/month)
- **Railway**: Free tier available

## Support

For deployment issues:
- Check the platform's documentation
- Ensure build command and output directory are correct
- Verify Node.js version compatibility
- Check build logs for specific errors

## Next Steps

1. Choose your preferred hosting platform
2. Follow the deployment steps above
3. Configure your custom domain (optional)
4. Test all pages and functionality
5. Set up monitoring/analytics (optional)

Your static site is now ready for production! 🚀
