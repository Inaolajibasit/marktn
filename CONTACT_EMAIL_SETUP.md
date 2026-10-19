# Activate MARKTN contact email

The `marktn.com` sending domain is **verified** in the existing Resend account as of 18 October 2026. Resend confirms all four records below are verified, so the sending-domain requirement is complete.

Public DNS points to GoDaddy nameservers (`ns13.domaincontrol.com` and `ns14.domaincontrol.com`), with existing Zoho mailbox MX records. The following verified records are retained here for reference. The names below are relative host names; keep these sending records and the existing Zoho MX records at `@` in place.

| Type | Name / Host | Value / Points to | Priority | TTL |
| --- | --- | --- | --- | --- |
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDuAUJilrZ7JC3ekBYemFkmS2GlO5y/OBsO2pw9arP5BrYPie7wTEVPYkYcvaMCJhLNY7f0akN+A+5QjzeULPEN0dvJZ2B7LWVjHx/xObBdPfQIeJQNtZkX4thwFvko43uBqT+8gbPcKE47nZOK+eyaM1Efg9S0nYtBXnWZ7ZatEwIDAQAB` | — | Default |
| MX | `send` | `feedback-smtp.us-east-1.amazonses.com` | 10 | Default |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | — | Default |
| CNAME | `rsend` | `send.forge.rmta.net` | — | Default |

These values were returned by Resend for this domain. The DKIM value is a public DNS verification record, not an API key.

To check the status later, open [Resend Domains](https://resend.com/domains) and select `marktn.com`. Its current status is **Verified**.

The app uses these server-side environment variables:

```dotenv
RESEND_API_KEY=<the existing account's API key>
CONTACT_FROM_EMAIL="MARKTN <Info@marktn.com>"
```

Keep the real API key in `.env.local` and the hosting provider's secret environment settings. The sender defaults to the address above if `CONTACT_FROM_EMAIL` is unset. The recipient is fixed to `Info@marktn.com`; replying to an enquiry addresses the visitor who filled out the form.

For the deployed site, configure the same variables and redeploy after changing them. The automated action checks use simulated email responses. On 18 October 2026, the user also approved one real enquiry through the live form: it displayed success, reset the form, and Resend confirmed delivery to Info@marktn.com.

## If the live form asks you to email directly

The exact message `Please email Info@marktn.com to start your enquiry.` means the deployed server has no `RESEND_API_KEY`. DNS verification alone does not supply that key to the website. The local `.env.local` is intentionally not uploaded with the source code.

For the Vercel project serving `marktn.com`, open **Settings → Environment Variables**, add `RESEND_API_KEY` using the existing Resend account's key, and select **Production**. Optionally set `CONTACT_FROM_EMAIL` to `MARKTN <Info@marktn.com>`. Save and redeploy the production deployment; existing deployments do not pick up changed environment variables. See [Vercel environment variable instructions](https://vercel.com/docs/environment-variables/managing-environment-variables).

On 18 October 2026, both production variables were configured in Vercel project `marktn`, with `RESEND_API_KEY` encrypted. Production deployment `dpl_AJ3YaB5vJWPjtk4yYfm3MVsu3HqZ` rebuilt the existing commit `55206b8` successfully and is live on `marktn.com` and `www.marktn.com`. The missing-production-key issue is resolved. One user-approved test enquiry titled `New enquiry — MARKTN contact form test (MARKTN)` was submitted through the live form, and Resend reported its status as **delivered**.
