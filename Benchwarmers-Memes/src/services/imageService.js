export async function fetchDuckImages(count = 3) {
  const requests = [];

  for (let i = 0; i < count; i++) {
    requests.push(
      fetch(`https://corsproxy.io/?https://random-d.uk/api/v2/random?v=${Date.now()}`)
      .then(res => res.json())
    );
  }

  const results = await Promise.all(requests);

  return results.map(img => ({
    url: img.url
  }));
}