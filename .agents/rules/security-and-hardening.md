# Security & Web Hardening Standards

Every developer and AI agent working on this repository must enforce these security rules across all pages, APIs, and client interactions.

---

## 1. Zero-Trust Server-Side Validation & Sanitization
- **Strict Schemas**: Every API route receiving payloads must validate data with **Zod** schemas before processing.
- **Sanitize Text Inputs**: Strip or escape any HTML/script tags from user inputs to neutralize Stored/Reflected XSS.
- **No Direct HTML Injection**: Never use `dangerouslySetInnerHTML` unless explicitly sanitized by a vetted library (like DOMPurify), and only when strictly unavoidable.

## 2. HTTP Security Headers (Defense in Depth)
All responses must enforce enterprise-grade security headers configured in `next.config.ts`:
- `Content-Security-Policy`: Restricts scripts, styles, fonts, and connects to allowed domains.
- `X-Frame-Options: DENY`: Prevents Clickjacking and framing inside unauthorized external domains.
- `X-Content-Type-Options: nosniff`: Prevents MIME-confusion attacks.
- `Referrer-Policy: strict-origin-when-cross-origin`: Stops leaking internal paths/tokens in HTTP referrers.
- `Permissions-Policy`: Disables unnecessary browser capabilities (camera, microphone, geolocation).
- `Strict-Transport-Security`: Enforces modern TLS (HTTPS) across all subdomains with `preload`.

## 3. Bot & Spam Mitigation (Anti-DDoS / Rate Limiting)
- **Honeypot Trap**: All public forms must include an invisible honeypot field (`_gotcha` or `hp_field`). Submissions with this field filled must be silently discarded to block automated spam bots.
- **API Rate Limiting**: Contact and lead submission endpoints must enforce IP-based rate limiting (e.g. max 5 requests per 15-minute window per IP) to prevent flooding and resource exhaustion.

## 4. Secret & Credential Isolation
- **No Leaked Secrets**: NEVER prefix sensitive keys (database URLs, webhook signing secrets, SMTP credentials, private API keys) with `NEXT_PUBLIC_`.
- Only publicly readable client flags (like Google Analytics tracking IDs or public site URLs) may use `NEXT_PUBLIC_`.
- Keep `.env*.local` strictly ignored in `.gitignore`.

## 5. Safe Dependency Management
- Regularly review packages for known CVEs with `npm audit`.
- Keep minimal third-party scripts. Avoid loading unpinned external scripts from untrusted CDNs.
