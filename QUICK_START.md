# Quick Start Guide - Contact Form Integration

## Step 1: Update Email Address

Open `server.js` and replace `YOUR_EMAIL_HERE` with your actual email:

```javascript
// Line 28 in server.js
to: 'YOUR_EMAIL_HERE',  // ← Replace this with your email
```

Example:
```javascript
to: 'john.doe@gmail.com',
```

## Step 2: Run the Servers

You need **TWO terminal windows**:

### Terminal 1 - Start Backend API
```bash
npm run server
```
You should see: `API server running on http://localhost:3001`

### Terminal 2 - Start Frontend (Already running in Bolt)
The frontend is already running via Bolt's preview.

## Step 3: Test the Contact Form

1. Navigate to the Contact page in your app
2. Fill out the form
3. Click "Send Message"
4. Check your email inbox

## That's It!

Your contact form is now connected to Resend and will send emails to your inbox.

---

## Environment Variables Already Configured

✅ Your `.env` file contains:
- `RESEND_API_KEY` - Your Resend API key
- `VITE_API_URL` - API server URL (localhost:3001)

## File Changes Summary

### New Files:
- ✅ `server.js` - Express API server with Resend integration
- ✅ `.env.example` - Template for environment variables
- ✅ `CONTACT_FORM_SETUP.md` - Detailed documentation
- ✅ `QUICK_START.md` - This file

### Modified Files:
- ✅ `src/pages/Contact.tsx` - Updated with API integration
- ✅ `package.json` - Added `server` script
- ✅ `.env` - Added Resend API key

### Installed Dependencies:
- ✅ `resend` - Official Resend SDK
- ✅ `express` - API server framework
- ✅ `cors` - CORS middleware
- ✅ `dotenv` - Environment variables

---

## Troubleshooting

**Q: I see "Failed to send email"**
- Check that you replaced `YOUR_EMAIL_HERE` in `server.js`
- Verify the backend server is running (`npm run server`)

**Q: The form doesn't submit**
- Open browser console (F12) to check for errors
- Ensure backend is running on port 3001

**Q: I don't receive emails**
- Check your spam folder
- Verify your email in `server.js` is correct
- Check Resend dashboard for delivery status

---

## Next Steps

1. Test the form thoroughly
2. Customize the email template in `server.js` if needed
3. Update email styling to match your brand
4. Consider adding a "From Name" field to the form

Enjoy your new contact form! 🚀
