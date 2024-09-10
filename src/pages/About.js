import React from 'react';
import Subpage from './Subpage';

function Item({ src, children }) {
  return (
    <div className="col-xs-12 col-sm-4 col-md-3 tile">
      <img src={src} width="150" height="150" className="my-2" />
      <h5>{children}</h5>
    </div>
  );
}

function About() {
  return (
    <Subpage header="O projekcie">
      <div className="row">
        <div className="col-12">
          <h4 className="my-3">Autorzy</h4>
        </div>
      </div>
      
      <div className="row justify-content-center">
        <Item src="./img/rychel.jpg">Jakub Rychel</Item>
        <Item src="./img/rura.jpg">Tomasz Rura</Item>
      </div>
        
      <div className="row">
        <div className="col-12">
          <h4 className="my-3">Technologie</h4>
        </div>
      </div>
      
      <div className="row">
        <Item src="./img/html.png">HTML 5</Item>
        <Item src="./img/css.png">CSS 3</Item>
        <Item src="./img/javascript.png">Javascript</Item>
        <Item src="./img/bootstrap.png">Bootstrap</Item>
        <Item src="./img/ajax.png">AJAX</Item>
      </div>
    </Subpage>
  );
}

export default About;