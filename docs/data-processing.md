# Data Processing and Retention Map

This is an engineering inventory, not legal advice or a privacy notice. The organization must have counsel review the final purposes, lawful bases, disclosures, processor terms, transfer mechanisms, retention periods, and visitor-rights process for every relevant jurisdiction.

| Flow | Data | Storage/processors | Default retention |
| --- | --- | --- | --- |
| Contact | Name, email, optional phone/organization, language, reason, message | Processed by the Worker and delivered through Resend; not persisted in D1 | Define mailbox and Resend retention organizationally |
| Subscription request | Name, email, requested Topics, locale, random confirmation credential | D1 pending confirmation and Resend transactional email | Pending record expires after 24 hours |
| Confirmed subscription | Email, name, explicit Topic choices | Resend Contacts | Until unsubscribe/deletion under the approved policy |
| RSVP | Name, email, guest count, optional accessibility/dietary notes, event, locale | Cloudflare D1 and Resend transactional email | 365 days by default; configurable with `RSVP_RETENTION_DAYS` |
| Abuse prevention | Salted hashes of IP and normalized email, counters | Cloudflare D1 | Approximately two rate-limit windows |
| Request idempotency | Request UUID, route, status, generic response | Cloudflare D1 | 30 days when no retained RSVP/confirmation references it |
| Provider webhooks | Verified raw Resend/Stripe event body, ID, and type | Cloudflare D1 | 90 days |
| Bot challenge | Turnstile token, IP, hostname, action | Cloudflare Turnstile | Provider-controlled; confirm in the production agreement |
| Payments | Payment and billing fields | Stripe-hosted pages; card data does not pass through this site | Stripe and organizational policy |

## Required owner decisions

- Name the controller/business and provide a working privacy-rights contact.
- Document purposes and lawful bases for contact, marketing, RSVP, accessibility/dietary, fraud-prevention, and payment processing.
- Decide whether optional sensitive RSVP notes are necessary and who may access them.
- Approve deletion schedules and a documented procedure for D1, mailboxes, Resend, Stripe, logs, backups, and exports.
- List Cloudflare, GitHub, Resend, Stripe, and YouTube as applicable processors/third parties and document international transfers.
- Define age eligibility, parental-consent requirements, and prohibited data.
- Arrange professional review of English, Hebrew, Spanish, and Persian legal/consent text.

Access to D1 exports and production logs must be least-privilege, audited, and limited to authorized staff. Never copy production personal data into development, test fixtures, GitHub issues, or this repository.
