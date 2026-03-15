export async function fetchQuotes(count = 3) {
  const response = await fetch(`/api/quotes?count=${count}`);
  const data = await response.json();

  return data.map(q => ({
    text: q.q,
    author: q.a
  }));
}