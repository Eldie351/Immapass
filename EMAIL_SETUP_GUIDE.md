# Welcome Email Configuration Guide

This guide explains how to configure the custom welcome email in your Supabase Dashboard.

## Overview
We use Supabase's built-in **Confirm signup** email template to send a branded welcome message to users immediately after they sign up.

---

## Configuration Steps

### 1. Access Email Templates
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to **Authentication** → **Email Templates** in the left sidebar.

### 2. Update "Confirm signup" Template
1. In the list of templates, find **Confirm signup**.
2. **Subject**: Change it to `Welcome to Immipass - Confirm Your Email`
3. **Body**: 
   - Open [welcome_email_template.html](file:///C:/Users/EUPH-DG-PC/Immapass/email-templates/welcome_email_template.html).
   - Copy the entire HTML content.
   - Paste it into the "Body" field in the Supabase Dashboard.

### 3. Configure Sender Information
1. Go to **Authentication** → **Email Settings**.
2. **Sender Name**: Set this to `Immipass`
3. **Sender Email**: Set this to your desired sender address (e.g., `noreply@immipass.com`).
4. Click **Save** at the bottom of the page.

---

## Template Variables
The template uses the following Supabase variables:
- `{{ .ConfirmationURL }}`: The link the user clicks to confirm their email.
- `{{ .Data.full_name }}`: The user's name provided during signup (retrieved from user metadata).

---

## Verification
1. Create a new test account on your website.
2. Check your inbox for the branded welcome email.
3. Ensure the branding, name, and confirmation link look correct.

> [!TIP]
> If you want to use a professional email service like **Resend** or **SendGrid** in the future, check the `Advanced Approach` documented in the `implementation_plan.md`.
