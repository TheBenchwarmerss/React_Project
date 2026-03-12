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
    <div className="siteWrapper">

    <input type="checkbox" id="theme-toggle" />

    <div class="site-wrapper">
        <header>
            <div class="brand">Meme Generator</div>
            <label for="theme-toggle" class="theme-label">Toggle Dark Mode</label>
        </header>

        <div class="main-content">
            <div class="controls">
              {content.map((item, index) => (
                <div key={index}>
                  <img src={item.image} width="700"/>
                  <p>"{item.quote}"</p>
                  <p>- {item.author}</p>
                </div>
            ))}

                <button type="button">Update Image</button>
            </div>
        </div>
    </div>

    </div>
  );
}