# Contact Form with Resend Email Integration - Setup Guide

## Overview
This guide explains how to set up and run the contact form with Resend email API integration.

## Features
- Beautiful, responsive contact form
- Email notifications via Resend API
- Form validation
- Loading states and user feedback
- Success/error messages
- Professional email template

## Prerequisites
- Node.js installed
- Resend account with API key
- Your email address for receiving contact form submissions

## File Structure
```
project/
├── server.js              # Express API server
├── src/pages/Contact.tsx  # Contact form component
├── .env                   # Environment variables (DO NOT COMMIT)
├── .env.example          # Example environment file
└── package.json          # Dependencies
```

## Setup Instructions

### 1. Install Dependencies
All dependencies are already installed:
- `resend` - Resend Node.js SDK
- `express` - API server
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

### 2. Configure Environment Variables

Your `.env` file is already configured with your Resend API key:
```
RESEND_API_KEY="re_CMSe43eg_JRcRrvQ5bXRjqkWUree1UvqA"
VITE_API_URL="http://localhost:3001"
```

### 3. Update Email Recipient

**IMPORTANT**: Open `server.js` and replace `YOUR_EMAIL_HERE` with your actual email address:

```javascript
to: 'YOUR_EMAIL_HERE',  // Replace with your email
```

Example:
```javascript
to: 'john@example.com',
```

### 4. Running the Application

You need to run **TWO** servers:

#### Terminal 1 - Frontend (Vite)
```bash
npm run dev
```
This runs on `http://localhost:5173`

#### Terminal 2 - Backend API (Express)
```bash
npm run server
```
This runs on `http://localhost:3001`

### 5. Testing the Contact Form

1. Open your browser to `http://localhost:5173`
2. Navigate to the Contact page
3. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message
4. Click "Send Message"
5. You should see:
   - Loading spinner while sending
   - Success message when complete
   - Email arrives in your inbox

## Email Template

The email sent includes:
- Sender name
- Sender email (clickable)
- Message content
- Timestamp
- Professional styling with your brand colors

## API Endpoint

**POST** `/api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your services"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "id": "resend-email-id"
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message description"
}
```

## Validation

The form validates:
- All fields are required
- Email format is correct
- Prevents empty submissions

## Security Features

- API key stored in environment variables
- CORS enabled for security
- Input validation on backend
- Email format validation
- Error handling for failed sends

## Troubleshooting

### "Failed to send email"
- Check your Resend API key is correct
- Verify you've replaced `YOUR_EMAIL_HERE` in server.js
- Check the API server is running on port 3001

### "Network error"
- Ensure both servers are running
- Check that CORS is enabled
- Verify VITE_API_URL is correct in .env

### "Invalid email address"
- Ensure the email format is valid
- Check for spaces or special characters

## Production Deployment

For production:

1. Update `.env`:
```
VITE_API_URL="https://your-production-api.com"
```

2. Deploy backend server to hosting service (Heroku, Railway, etc.)

3. Update `server.js` to use production domain in CORS:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

4. Build frontend:
```bash
npm run build
```

## Support

For issues with:
- **Resend API**: Visit https://resend.com/docs
- **Form functionality**: Check browser console for errors
- **API errors**: Check terminal running `npm run server`

## Important Notes

- Never commit `.env` file to version control
- Keep your Resend API key secure
- Test email sending before going live
- Monitor your Resend email quota
- Replace placeholder email address before deployment
