import React from "react";
import "./scss/styles.scss";

import Navigation from "./components/nav";
import Illustration from "./components/illustration";

export default function App({ children }) {
  return (
    <>
      <Navigation />
      <div className="menu-blur">
        <Illustration />
        <div className="container">{children}</div>
      </div>
    </>
  );
}
