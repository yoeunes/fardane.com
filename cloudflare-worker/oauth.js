/**
 * Cloudflare Worker — OAuth proxy for Decap CMS ↔ GitHub
 *
 * Deployment:
 *   1. Create a GitHub OAuth App (https://github.com/settings/developers)
 *      - Homepage URL:               https://fardane.com
 *      - Authorization callback URL:  https://fardane.com/api/auth/callback
 *   2. In Cloudflare Dashboard → Workers & Pages → Create Worker ("fardane-oauth")
 *   3. Paste this file's contents
 *   4. Settings → Variables & Secrets:
 *        CLIENT_ID     = <GitHub OAuth App Client ID>
 *        CLIENT_SECRET = <GitHub OAuth App Client Secret>  (encrypt)
 *   5. Triggers → Routes:
 *        fardane.com/api/auth*  →  fardane-oauth
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ── CORS preflight ────────────────────────────────────────────
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': 'https://fardane.com',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // ── Step 1: Redirect user to GitHub login ─────────────────────
    if (url.pathname === '/api/auth') {
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', env.CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', 'https://fardane.com/api/auth/callback');
      authUrl.searchParams.set('scope', 'repo,user');
      authUrl.searchParams.set('state', crypto.randomUUID());
      return Response.redirect(authUrl.toString(), 302);
    }

    // ── Step 2: Exchange code → access token, notify CMS ──────────
    if (url.pathname === '/api/auth/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response('Missing code parameter', { status: 400 });
      }

      const tokenResponse = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET,
            code,
          }),
        },
      );

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        return new Response(
          `OAuth error: ${tokenData.error_description || tokenData.error}`,
          { status: 400 },
        );
      }

      // Send token back to the Decap CMS window via postMessage
      const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="utf-8"><title>جاري التوثيق…</title></head>
<body>
<p style="font-family:sans-serif;text-align:center;margin-top:40px">جاري التوثيق… يرجى الانتظار.</p>
<script>
(function() {
  var token = ${JSON.stringify(tokenData.access_token)};
  var provider = "github";
  if (window.opener) {
    window.opener.postMessage(
      "authorization:" + provider + ":success:" + JSON.stringify({ token: token, provider: provider }),
      "https://fardane.com"
    );
    window.close();
  }
})();
</script>
</body>
</html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      });
    }

    return new Response('Not found', { status: 404 });
  },
};
