import { useState } from 'react'
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import './App.css'

function App() {
  const [page, setPage] = useState('home');

  return page === 'home'
    ? <Home navigate={setPage} />
    : <Favorites navigate={setPage} />;
}
  
export default App;
