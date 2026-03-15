export async function fetchDuckImages(count = 1) {
  const requests = [];

  for (let i = 0; i < count; i++) {
    requests.push(
      fetch('/api/images').then(res => res.json())
    );
  }

  const results = await Promise.all(requests);

  return results.map(img => ({
    url: `https://wsrv.nl/?url=${encodeURIComponent(img.url)}`
  }));
}