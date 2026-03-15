export const handler = async (event) => {
  const response = await fetch(`https://stoic.tekloon.net/stoic-quote`);
  const rawBody = await response.text();
  JSON.parse(rawBody);
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: rawBody,
  };
};
