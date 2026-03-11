export async function fetchDuckImages(count = 3) {
  const requests = [];

  for (let i = 0; i < count; i++) {
    requests.push(
      fetch("https://api.allorigins.win/raw?url=https://random-d.uk/api/v2/random")
      .then(res => res.json())
    );
  }

  const results = await Promise.all(requests);

  return results.map(img => ({
    url: img.url
  }));
}