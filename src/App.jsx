import djJoubs from './assets/dj_joubi.png';
import './App.scss';

import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';

function App() {

  return (
    <>
      <header className="banner">
        <div className="banner-container">
            <div className="logo-container">
              <img src={djJoubs} className="logo" alt="DJ Joubi logo"/>
              <h1>DJ Joubi</h1>
            </div>
            <div className="open-spotify">
              <a href="https://open.spotify.com/" target="_blank">Open Spotify</a>
            </div>
          </div>
      </header>
      <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </BrowserRouter>
      </main>
    </>
  )
}

export default App;
