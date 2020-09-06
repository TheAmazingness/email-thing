import React from 'react';

const ErrorPage = () => (
  <>
    <section className="hero">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            <span className="icon is-large has-text-danger">
              <i className="fas fa-exclamation-circle" />
            </span>
            &nbsp;
            Error 404
          </h1>
          <h2 className="subtitle">
            Page not found!
          </h2>
        </div>
      </div>
    </section>
  </>
);

export default ErrorPage;