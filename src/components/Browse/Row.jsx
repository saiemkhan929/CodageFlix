import React, { useState } from "react";
import { posterURL } from "../../API/api";
import Slider from "react-slick";

function Row({ title, videos, funcs, tag, pop }) {
  const sanitizer = (text) => {
    return text.replace(/#/gi, "");
  };

  //Slider Prev button
  const Prev = ({ onClick }) => {
    return (
      <div className="left_button" onClick={onClick}>
        <i className="large material-icons">chevron_left</i>
      </div>
    );
  };

  //Slider Next button
  const Next = ({ onClick }) => {
    return (
      <div className="right_button" onClick={onClick}>
        <i className="large material-icons">chevron_right</i>
      </div>
    );
  };

  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 5,
    variableWidth: true,
    appendDots: (dots) => (
      <div>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    prevArrow: <Prev />,
    nextArrow: <Next />,
  };

  const clicked = (i) => {
    funcs.show(tag, i);
  };

  return (
    <div className="row_wrapper">
      <h2 className="row-title">{title}</h2>
      <Slider {...settings}>
        {videos.map((item, index) => {
          const {
            original_title,
            name,
            media_type,
            poster_path,
            backdrop_path,
            id,
          } = item;
          const title__ = original_title
            ? sanitizer(original_title)
            : sanitizer(name);

          //Check that there is any poster. If no poster then we'll skip that

          if (backdrop_path == null) return;

          return (
            <div
              className="col"
              key={item.id}
              onClick={(e) => {
                clicked(item);
              }}
            >
              <img
                className="poster"
                src={posterURL(backdrop_path, "s")}
                alt={title__}
              />
            </div>
          );
        })}
      </Slider>

      {pop && pop}
    </div>
  );
}

export default Row;
