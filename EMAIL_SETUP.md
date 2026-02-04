# Email Setup Guide for Contact Form

Your contact form is now configured to send emails using EmailJS. Follow these steps to complete the setup (takes ~5 minutes):

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (top right)
3. Create a free account (no credit card required)
4. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Click on Gmail icon
   - Connect your Gmail account (devpatel0276@gmail.com)
   - Authorize EmailJS to send emails on your behalf
4. Give it a name like "Portfolio Contact"
5. Click **Create Service**
6. **Copy the Service ID** (looks like `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the sidebar
2. Click **Create New Template**
3. Replace the template content with this:

```
Subject: New Portfolio Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. In the template settings:
   - **Template Name**: "Portfolio Contact Form"
   - **To Email**: {{to_email}} (or just use devpatel0276@gmail.com directly)
5. Click **Save**
6. **Copy the Template ID** (looks like `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Click on your profile icon (top right)
2. Go to **Account** → **API Keys**
3. **Copy the Public Key** (looks like a long string)

## Step 5: Update Your Code

1. Open `js/script.js`
2. Find lines 12-16 (near the top)
3. Replace the placeholder values:

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_xxxxxxx',      // Paste your Service ID here
  TEMPLATE_ID: 'template_xxxxxxx',    // Paste your Template ID here
  PUBLIC_KEY: 'your_public_key_here'  // Paste your Public Key here
};
```

## Step 6: Test It!

1. Open your portfolio in a browser
2. Scroll to the Contact section
3. Fill out the form and submit
4. Check your email (devpatel0276@gmail.com) for the message!

## Example Configuration

After setup, your code should look like this:

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123xyz',
  TEMPLATE_ID: 'template_def456uvw',
  PUBLIC_KEY: 'ghi789rst_abcdef123456'
};
```

## Troubleshooting

### "Email service not configured yet" message
- Make sure you've replaced all three values in `EMAILJS_CONFIG`
- Check that there are no typos in the IDs

### Emails not arriving
- Check your spam folder
- Verify the email service is connected in EmailJS dashboard
- Make sure the template has the correct variable names: `{{from_name}}`, `{{from_email}}`, `{{message}}`

### "Failed to send message" error
- Open browser console (F12) to see detailed error
- Check that your Public Key is correct
- Verify your EmailJS account is verified

## Free Tier Limits

EmailJS free plan includes:
- ✓ 200 emails per month
- ✓ Unlimited templates
- ✓ All features enabled

Perfect for a portfolio website!

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

---

**That's it!** Once configured, you'll receive all form submissions directly to your email. 📧
