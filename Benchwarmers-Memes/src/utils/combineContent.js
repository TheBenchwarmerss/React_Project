export function combineContent(images, quotes) {
  const combined = [];

  for (let i = 0; i < Math.min(images.length, quotes.length); i++) {
    combined.push({
      image: images[i].url,
      quote: quotes[i].text,
      author: quotes[i].author
    });
  }

  return combined;
}