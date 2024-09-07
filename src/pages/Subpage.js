import React from 'react';

function Subpage({ header, children }) {
  return (
    <section>
      <div className="container-fluid bg-header">
        <div className="container pt-4 pb-3 bg-header">
          <div className="col-12">
            <h3>{header}</h3>
          </div>
        </div>
      </div>
      <div className="container py-3 page-main">
        {children}
      </div>
    </section>
  );
}

export default Subpage;