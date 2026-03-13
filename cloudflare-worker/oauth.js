/**
 * Cloudflare Worker - GitHub OAuth Proxy for Decap CMS
 * Route: fardane.com/api/auth*
 *
 * Secrets to set in Cloudflare Workers dashboard:
 *   CLIENT_ID     - GitHub OAuth App Client ID
 *   CLIENT_SECRET - GitHub OAuth App Client Secret
 */

const ALLOWED_ORIGIN = 'https://fardane.com';

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request),
    });
  }

  // Step 1: Redirect to GitHub OAuth authorization
  if (path === '/api/auth') {
    const params = new URLSearchParams({
      client_id: env.CLIENT_ID,
      redirect_uri: `${ALLOWED_ORIGIN}/api/auth/callback`,
      scope: 'repo,user',
      state: crypto.randomUUID(),
    });
    return Response.redirect(
      `https://github.com/login/oauth/authorize?${params}`,
      302
    );
  }

  // Step 2: Exchange code for token (callback)
  if (path === '/api/auth/callback') {
    const code = url.searchParams.get('code');

    if (!code) {
      return new Response('Missing code parameter', { status: 400 });
    }

    // Exchange code for access token
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: env.CLIENT_ID,
          client_secret: env.CLIENT_SECRET,
          code: code,
          redirect_uri: `${ALLOWED_ORIGIN}/api/auth/callback`,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return new Response(
        `GitHub OAuth error: ${tokenData.error_description}`,
        { status: 400 }
      );
    }

    const token = tokenData.access_token;
    const provider = 'github';

    // Return HTML that posts the token back to the CMS (postMessage)
    const html = `<!DOCTYPE html>
<html>
<head><title>Authorizing...</title></head>
<body>
<script>
(function() {
  function receiveMessage(e) {
    console.log('receiveMessage %o', e);
    window.opener.postMessage(
      'authorization:${provider}:success:{"token":"${token}","provider":"${provider}"}',
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
    setTimeout(function() { window.close(); }, 1000);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:${provider}', '*');
})()
<\/script>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        ...corsHeaders(request),
      },
    });
  }

  return new Response('Not found', { status: 404 });
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  fetch: handleRequest,
};
