import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Main() {
  return (
    <section className="bg-header">
      
      <div className="container">
      
        <div className="row">
        
          <div className="col-xs-12 col-lg-6 py-5">
            <h2 className="my-3">Witamy na stronie projektu</h2>
            <p className="paragraph-welcome">
              Zapraszamy do zapoznania się z zawartością strony. Przejdź do sekcji Pozycja ISS i Kursy walut NBP by zapoznać się z danymi zamieszczonymi na stronie.
            </p>
            <div className="d-flex gap-1">
              <Link to="/iss" className="btn welcome-link my-2">Pozycja ISS »</Link>
              <Link to="/nbp" className="btn welcome-link my-2">Kursy walut NBP »</Link>
            </div>
          </div>
          
          <div className="col-xs-12 col-md-6 py-5">
            <img src="./img/landing.svg" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;