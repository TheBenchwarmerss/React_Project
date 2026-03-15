export async function fetchQuotes(count = 3) {
  const requests = [];

  for (let i = 0; i < count; i++) {
    requests.push(
      fetch('/api/quotes').then(res => res.json())
    );
  }

  const responses = await Promise.all(requests);

  return responses
    .flatMap((quote) => (Array.isArray(quote) ? quote : [quote]))
    .filter(Boolean)
    .map((q) => ({
      text: q.q ?? q.text ?? '',
      author: q.a ?? q.author ?? 'Unknown',
    }));
}