import { downloadImage } from "../utils/downloadImage";
import { useState, useEffect } from "react";

export default function Favorites({ navigate }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    setFavorites(stored ? JSON.parse(stored) : []);
  }, []);

  function removeFavorite(index) {
    const updated = favorites.filter((_, i) => i !== index);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setFavorites(updated);
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
            {favorites.length === 0 ? (
              <p style={{ marginTop: '2rem', fontSize: '1.5rem' }}>No favorites saved yet.</p>
            ) : (
              favorites.map((item, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '30px', gap: '16px' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
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
                        "{item.text}"
                      </p>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeFavorite(index)}>Remove</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
