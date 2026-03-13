import { fetchDuckImages } from "../services/imageService";
import { fetchQuotes } from "../services/quoteService";
import { combineContent } from "../utils/combineContent";
import { useState, useEffect } from "react";

export default function Home() {

  const [quotes, setQuotes] = useState([]);
  const [images, setImages] = useState([]);

  console.log(quotes);
  console.log(images);


  useEffect(() => {
    fetchDuckImages().then(setImages);
    fetchQuotes().then(setQuotes);
  }, []);

  const content = combineContent(images, quotes);
  
  function handleUpdate() {
    fetchDuckImages().then(setImages);
    fetchQuotes().then(setQuotes);
  }
  

  return (
    <div className="siteWrapper">

    <input type="checkbox" id="theme-toggle" />

    <div class="site-wrapper">
        <header>
            <div class="brand">Meme Generator</div>
            <label for="theme-toggle" class="theme-label">Toggle Dark Mode</label>
        </header>

        <div class="main-content">
            <div class="controls" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {content.map((item, index) => (
                <div key={index} style={{ position: 'relative', display: 'inline-block', marginBottom: '30px' }}>
                  <img src={item.image} height="500" style={{ display: 'block' }} />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    textAlign: 'center',
                  }}>
                    <p className="shadow-stroke">
                      "{item.quote}" <br></br>- {item.author}
                    </p>
                  </div>
                </div>
              ))}
            <button type="button" onClick={handleUpdate}>Update Image & Quote</button>
          </div>
        </div>
      </div>
    </div>
  );
}