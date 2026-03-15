export const handler = async () => {
  const response = await fetch('https://random-d.uk/api/v2/random');
  const data = await response.json();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
};
