# Email Templates - Image Hosting Instructions

## Current Status
All email templates are configured with **relative image paths** (e.g., `/image-copy-copy.png`) that work perfectly in the browser preview.

## For Email Deployment
Before sending these emails through an email service provider (like Mailchimp, SendGrid, etc.), you **MUST** replace all relative image paths with absolute URLs.

### Step-by-Step Instructions:

1. **Deploy your site** to a production domain (e.g., `https://yoursite.com`)

2. **Find and replace** all image paths in the email HTML files:
   - **Find:** `/image-copy-copy.png`
   - **Replace with:** `https://yoursite.com/image-copy-copy.png`

3. **Images to update:**
   - `/image-copy-copy.png`
   - `/owner-badge.png`
   - `/xplore-yellow.png`
   - `/vector.png`
   - `/logo-white.png`
   - `/unnamed.png`
   - `/exteriorpool2.jpg`
   - `/couple.jpg`
   - `/disney-night-fireworks.jpg`

### Quick Find & Replace
Use this pattern for bulk replacement in your email HTML files:

**Find:** `src="/`
**Replace with:** `src="https://yoursite.com/`

### Why This Matters
Email clients (Gmail, Outlook, etc.) require absolute URLs to load images properly. Relative paths will not work in email environments.

## Preview vs Production
- **Browser Preview:** Uses relative paths (current setup) ✓
- **Email Clients:** Requires absolute URLs (update before sending) ⚠️
