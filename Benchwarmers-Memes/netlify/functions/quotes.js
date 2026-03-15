export const handler = async (event) => {
  const response = await fetch(`https://stoic.tekloon.net/stoic-quote`);
  const data = await response.json();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
};
