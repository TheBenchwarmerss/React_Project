import { useQuotes } from "../hooks/useQuotes";
import { useImages } from "../hooks/useImages";
import { combineContent } from "../utils/combineContent";

export default function Home() {

  const quotes = useQuotes();
  const images = useImages();

  console.log(quotes);
  console.log(images);

  const content = combineContent(images, quotes);

  return (
    <div>

      <h1>Duckspiration</h1>

      {content.map((item, index) => (
        <div key={index}>
          <img src={item.image} width="300"/>
          <p>"{item.quote}"</p>
          <p>- {item.author}</p>
        </div>
      ))}

    </div>
  );
}