const QUOTE_API_URL = 'https://stoic.tekloon.net/stoic-quote';

function normalizeQuotePayload(payload) {
  const quote =
    payload?.quote ??
    payload?.text ??
    payload?.content ??
    payload?.data?.quote ??
    '';

  const author =
    payload?.author ??
    payload?.source ??
    payload?.by ??
    payload?.data?.author ??
    'Unknown';

  return { quote, author };
}

export const handler = async () => {
  try {
    const response = await fetch(QUOTE_API_URL, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: `Quote API failed with ${response.status}` }),
      };
    }

    const contentType = response.headers.get('content-type') || '';
    const rawBody = await response.text();

    let payload;
    if (contentType.includes('application/json')) {
      payload = JSON.parse(rawBody);
    } else {
      try {
        payload = JSON.parse(rawBody);
      } catch {
        payload = { quote: rawBody, author: 'Unknown' };
      }
    }

    const normalized = normalizeQuotePayload(payload);
    if (!normalized.quote) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Quote API returned no quote text.' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalized),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Unable to fetch quote.',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
