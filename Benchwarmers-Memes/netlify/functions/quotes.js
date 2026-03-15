export const handler = async (event) => {
  const response = await fetch(`https://api.quotable.io/random`);
  const data = await response.json();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
};
