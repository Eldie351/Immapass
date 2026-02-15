# Account Deletion Email Configuration Guide

## Overview

This guide explains how to configure the account deletion confirmation email in Supabase.

## Email Template

The account deletion confirmation email template is located at:
[account_deletion_confirmation.html](file:///C:/Users/EUPH-DG-PC/Immapass/email-templates/account_deletion_confirmation.html)

## Configuration Steps

### Option 1: Using Supabase Edge Functions (Recommended)

For production use, implement a proper email service using Supabase Edge Functions:

1. **Create an Edge Function**:
   ```bash
   npx supabase functions new send-deletion-email
   ```

2. **Install Email Service** (e.g., Resend):
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
   
   await resend.emails.send({
     from: 'Immipass <noreply@immipass.com>',
     to: userEmail,
     subject: 'Account Deletion Confirmation',
     html: emailTemplate,
   });
   ```

3. **Call from Frontend**:
   Update `AuthContext.tsx` to call the Edge Function before deleting the account.

### Option 2: Using Third-Party Email Service

Integrate directly with an email service provider:

**Services to consider**:
- **Resend** (recommended) - Modern, developer-friendly
- **SendGrid** - Established, feature-rich
- **Mailgun** - Reliable, good deliverability
- **Postmark** - Transactional email specialist

**Implementation**:
1. Sign up for an email service
2. Get API key
3. Add API key to environment variables
4. Update `deleteAccount` function to call the email API

### Option 3: Manual Email Template in Supabase Dashboard

For a simpler approach (less control):

1. Go to Supabase Dashboard → Authentication → Email Templates
2. Create a custom template for account deletion
3. Use Supabase's built-in email sending

**Limitations**:
- Less control over when email is sent
- Limited customization
- Tied to Supabase's email infrastructure

## Email Template Variables

The email template uses these variables:

- `{{ .Email }}` - User's email address
- `{{ .Data.full_name }}` - User's full name from metadata

## Current Implementation

Currently, the deletion email is **logged to console** as a placeholder. To enable actual email sending:

1. Choose one of the options above
2. Update the `deleteAccount` function in `AuthContext.tsx`
3. Replace the console.log with actual email sending code

## Example: Using Resend

```typescript
const deleteAccount = async () => {
  try {
    const userEmail = user?.email;
    const userName = user?.user_metadata?.full_name || 'User';

    // Send confirmation email BEFORE deletion
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Immipass <noreply@immipass.com>',
        to: userEmail,
        subject: 'Account Deletion Confirmation',
        html: emailTemplate, // Load from file or inline
      }),
    });

    if (!response.ok) {
      console.error('Failed to send deletion email');
    }

    // Proceed with deletion
    const { error } = await supabase.rpc('delete_user');
    // ... rest of deletion logic
  } catch (err) {
    return { error: err as Error };
  }
};
```

## Testing

To test the email:

1. Set up a test email service account
2. Configure the API key
3. Create a test account
4. Delete the test account
5. Verify the email is received

## Security Considerations

✅ **Send email BEFORE deletion** - Ensures user receives confirmation even if deletion fails

✅ **Don't expose sensitive data** - Email should only confirm deletion, not include passwords or sensitive info

✅ **Rate limiting** - Prevent abuse by rate limiting deletion requests

✅ **Secure API keys** - Store email service API keys in environment variables, never in code

## Next Steps

1. Choose an email service provider
2. Sign up and get API key
3. Update `AuthContext.tsx` with email sending code
4. Test with a test account
5. Monitor email deliverability

## Support

If users report not receiving the deletion confirmation email:

1. Check spam/junk folders
2. Verify email service is configured correctly
3. Check email service logs for delivery status
4. Ensure email template is valid HTML
