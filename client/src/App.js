import React from 'react';
import './scss/styles.scss';

import Navigation from './components/nav';
import Footer from './components/footer';

export default function App({children}) {
  return (
    <>
      <Navigation />
      <div className="menu-blur">
        <div className="container">{children}</div>
        <Footer />
      </div>
    </>
  );
}
