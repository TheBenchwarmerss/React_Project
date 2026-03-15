import { fetchDuckImages } from "../services/imageService";
import { fetchQuotes } from "../services/quoteService";
import { combineContent } from "../utils/combineContent";
import { downloadImage } from "../utils/downloadImage";
import { useState, useEffect } from "react";

export default function Home({ navigate }) {

  const [quotes, setQuotes] = useState([]);
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);

  console.log(quotes);
  console.log(images);


  useEffect(() => {
    fetchDuckImages().then(setImages);
    fetchQuotes().then(setQuotes);
    setFavorites(fetchFavorites());
  }, []);

  
  function fetchFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
  function addFavorite(text, image) {
    const newFavorite = { text, image };
    localStorage.setItem('favorites', JSON.stringify([...favorites, newFavorite]));
    setFavorites([...favorites, newFavorite]);
  }

  const content = combineContent(images, quotes);
  
  function handleUpdate() {
    fetchDuckImages().then(setImages);
    fetchQuotes().then(setQuotes);
  }
  

  return (
    <div className="siteWrapper">

    <input type="checkbox" id="theme-toggle" />

    <div className="site-wrapper">
        <header>
            <div className="brand">Meme Generator</div>
            <nav>
            <button type="button" onClick={() => navigate('home')}>Home</button>
            <button type="button" onClick={() => navigate('favorites')}>Favorites</button>
          </nav>
            <label htmlFor="theme-toggle" className="theme-label">Toggle Dark Mode</label>
        </header>

        <div className="main-content">
            <div className="controls" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    pointerEvents: 'none',
                  }}>
                    <p className="shadow-stroke">
                      "{item.quote}" <br></br>- {item.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={() => content[0] && downloadImage(content[0].image)} 
                style={{ marginTop: '10px', position: 'relative', zIndex: 10, cursor: 'pointer' }}
              >
                Download Image
              </button>
              <button type="button" onClick={() => content[0] && addFavorite(content[0].quote, content[0].image)}>Add to Favorites</button>
              <button type="button" onClick={handleUpdate}>Update Image & Quote</button>
            </div>
        </div>
      </div>
    </div>
  );
}