import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Generos from "./components/Generos";
import Directores from "./components/Directores";
import Productoras from "./components/Productoras";
import Tipos from "./components/Tipos";
import Medias from "./components/Medias";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Peliculas API
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/generos">
                    Géneros
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/directores">
                    Directores
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/productoras">
                    Productoras
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tipos">
                    Tipos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/medias">
                    Medias
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/generos" element={<Generos />} />
          <Route path="/directores" element={<Directores />} />
          <Route path="/productoras" element={<Productoras />} />
          <Route path="/tipos" element={<Tipos />} />
          <Route path="/medias" element={<Medias />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;