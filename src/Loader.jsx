import React from "react";
import logo from "./logo.png";

function Loader() {
  return (
    <div className="loader">
      <img src={logo} alt="Logo" className="loader-logo" />
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
