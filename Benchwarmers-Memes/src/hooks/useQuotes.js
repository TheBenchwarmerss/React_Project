import { useState, useEffect } from "react";
import { fetchQuotes } from "../services/quoteService";

export function useQuotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes().then(setQuotes);
  }, []);

  return quotes;
}