import React from 'react';

export default function Messages() {
  return (
    <>
      {localStorage.getItem('token') !== null ? (
        <div className="hei">
          <h1>HEI</h1>
        </div>
      ) : (
        <div className="hei">
          <h1>LOG IN</h1>
        </div>
      )}
    </>
  );
}
