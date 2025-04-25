

import React from 'react';

function Footer() {
  return (
    <footer
      className="fixed bottom-0 w-full bg-opacity-90 backdrop-blur-md border-t py-3 text-center text-sm z-50"
      style={{
        backgroundColor: 'var(--navbar-bg)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-color)',
      }}
    >
      {/* {new Date().getFullYear()} */}
      <small> CryptoDash - Built by Meet Panchal</small>
    </footer>
  );
}

export default Footer;
