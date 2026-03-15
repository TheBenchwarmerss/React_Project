export async function fetchQuotes(count = 1) {
  const requests = [];

  for (let i = 0; i < count; i++) {
    requests.push(
      fetch('/api/quotes').then(res => res.json())
    );
  }
  
  const results = await Promise.all(requests);
  return results.map(data => ({
    text: data.quote,
    author: data.author
  }));
}