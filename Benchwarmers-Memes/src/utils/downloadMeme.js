import html2canvas from "html2canvas";

export async function downloadMeme(element, fileName = 'meme.png') {
  if (!element) {
    console.error("Download failed: No DOM element provided.");
    return;
  }

  try {
    const canvas = await html2canvas(element, { 
      useCORS: true, 
      allowTaint: true 
    });
    
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    console.error("Error generating meme image:", error);
  }
}