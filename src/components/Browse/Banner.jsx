import React from "react";
import { posterURL } from "../../API/api";

function Banner({ movie }) {
  if (movie) {
    const { original_title, backdrop_path, overview } = movie;

    return (
      <div
        className="banner"
        style={{
          backgroundImage: `url(${posterURL(backdrop_path, "l")})`,
          backgroundSize: "cover",
        }}
      >
        <h1 className="title">{original_title}</h1>
        <h6 className="details">{overview}</h6>
        <div className="buttons">
          <button className="play">
            <i className="large material-icons">play_arrow</i> Play
          </button>
          <button className="more_info">
            <i className="large material-icons">info_outline</i> More Info
          </button>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Banner;
