function normalizeQuote(data) {
  return {
    text: data?.quote ?? data?.text ?? 'No quote available right now.',
    author: data?.author ?? data?.source ?? 'Unknown',
  };
}

async function fetchSingleQuote() {
  const response = await fetch('/api/quotes');
  if (!response.ok) {
    throw new Error(`Quote request failed with ${response.status}`);
  }

  const data = await response.json();
  return normalizeQuote(data);
}

export async function fetchQuotes(count = 1) {
  const requests = [];

  for (let i = 0; i < count; i++) {
    requests.push(fetchSingleQuote());
  }

  const settled = await Promise.allSettled(requests);
  return settled.map((result) =>
    result.status === 'fulfilled'
      ? result.value
      : { text: 'No quote available right now.', author: 'Unknown' }
  );
}