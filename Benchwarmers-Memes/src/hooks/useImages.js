import { useState, useEffect } from "react";
import { fetchDuckImages } from "../services/imageService";

export function useImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchDuckImages().then(setImages);
  }, []);

  return images;
}