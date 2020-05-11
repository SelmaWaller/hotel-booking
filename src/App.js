import React from "react";
import "./scss/styles.scss";

import Illustration from "./components/illustration";

export default function App({ children }) {
  return (
    <>
      <Illustration />
      <div className="container">{children}</div>
    </>
  );
}
