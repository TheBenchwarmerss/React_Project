export const downloadImage = async (imageUrl) => {
  try {
    const secureUrl = imageUrl.replace(/^http:\/\//i, 'https://');
    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${secureUrl}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error("Proxy server rejected the request.");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = secureUrl.split('/').pop() || 'downloaded-meme.jpg';
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error("The direct download was blocked:", error);
    alert("The image server blocked the direct download. Opening in a new tab instead!");
    window.open(imageUrl.replace(/^http:\/\//i, 'https://'), '_blank', 'noopener,noreferrer');
  }
};