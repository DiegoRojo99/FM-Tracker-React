import React from 'react';
import Nav from './nav/Nav';

function Layout({ children }) {
  return (
    <div>
      <Nav />
      <div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
