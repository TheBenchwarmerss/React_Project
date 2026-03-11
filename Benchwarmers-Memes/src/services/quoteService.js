export async function fetchQuotes(count = 3) {
  const response = await fetch(`https://api.allorigins.win/raw?url=https://zenquotes.io/api/random/${count}`);
  const data = await response.json();

  return data.map(q => ({
    text: q.q,
    author: q.a
  }));
}