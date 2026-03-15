export const handler = async (event) => {
  const count = event.queryStringParameters?.count || 3;
  const response = await fetch(`https://zenquotes.io/api/random/${count}`);
  const data = await response.json();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
};
