import React, { useEffect, useState } from "react";
import logo from "../../logo.png";
import profile_icon from "../../profile_icon.png";

function Nav() {
  //will work as componentDidMount

  const [headerClass, setHeaderClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.pageYOffset > 100) {
        setHeaderClass("black_header");
      } else {
        setHeaderClass("");
      }
    });
  }, []);

  return (
    <div className={"header " + headerClass}>
      <div className="left_part">
        <img src={logo} />
        <ul className="menu">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#tv-shows">TV Shows</a>
          </li>
          <li>
            <a href="#movies">Movies</a>
          </li>
          <li>
            <a href="#latest">Latest</a>
          </li>
        </ul>
      </div>
      <div className="right_part">
        <ul>
          <li>
            <img src={profile_icon} alt="" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
