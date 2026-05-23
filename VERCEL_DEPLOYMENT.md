# Vercel Deployment Configuration

## Problem
The project was configured for Cloudflare Workers deployment but was deployed to Vercel, causing 404 errors.

## Solution
Configured the project for Vercel by:

1. **vercel.json** - Added build configuration specifying:
   - Build command: `npm run build`
   - Output directory: `dist/client` (static assets)
   - Rewrites for SPA routing

2. **.vercelignore** - Configured to exclude unnecessary files from deployment:
   - Excludes node_modules, .wrangler, temp files, etc.
   - Ensures source files are available for Vercel's build

3. **Environment** - Set NODE_ENV=production for build

## Current Status
- ✅ Project builds successfully: `npm run build`
- ✅ Static assets are generated in `dist/client`
- ✅ Vercel configuration in place: `vercel.json`
- ✅ Client-side routing configured with rewrites

## To Deploy to Vercel
1. Push this configuration to your git repository
2. Vercel will automatically detect the `vercel.json` file
3. Next deployment should resolve the 404 errors

## Alternative: Deploy to Cloudflare
If you prefer to use Cloudflare Pages/Workers (which this project was originally designed for):
- The `wrangler.jsonc` is already configured
- Run: `npm run build && wrangler pages deploy dist/client`

## Notes
- The current setup serves the client-side app statically from Vercel
- For full SSR capabilities with Vercel, consider using Next.js or a Vercel-specific framework
- The Cloudflare-optimized build is still configured but not used for Vercel deployment
