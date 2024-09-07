import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from './pages/Main';
import ISS from './pages/ISS';
import NBP from './pages/NBP';
import About from './pages/About';

function Header() {
  const [navbarState, setNavbarState] = useState(false);

  const handleLinkClick = () => setNavbarState(false);

  return (<>
    <button
      className='navbar-toggler position-fixed d-lg-none d-block'
      onClick={() => setNavbarState(prevState => !prevState)}
    >
      <i class={navbarState ? 'bi bi-x' : 'bi bi-list'}></i>
    </button>
    <header className={`container-fluid sticky-lg-top d-flex flex-row justify-content-center align-items-center ${
      navbarState ? 'd-block' : 'd-none d-lg-block'
    } bg-nav`}>
      <nav className="container navbar flex-row py-0 justify-content-center justify-content-lg-between">
        <Link to="/" className="navbar-brand my-0 py-0 d-none d-lg-block">
          <h1 className="my-0 py-0">Projekt egzaminacyjny</h1>
        </Link>
        <ul className="nav flex-column flex-lg-row align-items-center">
          <li className="nav-item"><Link to="/" className="btn menu-link my-2" onClick={handleLinkClick}>Strona główna</Link></li>
          <li className="nav-item"><Link to="/iss" className="btn menu-link my-2" onClick={handleLinkClick}>Pozycja ISS</Link></li>
          <li className="nav-item"><Link to="/nbp" className="btn menu-link my-2" onClick={handleLinkClick}>Kursy walut NBP</Link></li>
          <li className="nav-item"><Link to="/about" className="btn menu-link my-2" onClick={handleLinkClick}>O projekcie</Link></li>
        </ul>
      </nav>
    </header>
  </>);
}

function App() {
  return (
    <Router>
      <div className="bg-overlap"></div>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/iss" element={<ISS />} />
        <Route path="/nbp" element={<NBP />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
      <footer className="container py-3">
        Projekt egzaminacyjny z przedmiotu Elektroniczna Wymiana Danych, WZISN-1112, semestr zimowy 2019-20. Autorzy: Jakub Rychel, Tomasz Rura.
      </footer>
    </Router>
  );
}

export default App;
