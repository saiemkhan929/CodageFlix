import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { instance, API_KEY, posterURL } from "../../API/api";
import ratio from "../../API/ratio";

function Popup({ item, hide }) {
  const [close, setClose] = useState(true);
  const [genre, setgenre] = useState([]);
  const [video, setVideo] = useState(false);
  const [videoID, setVideoID] = useState(null);
  const [styles, setStyles] = useState({
    youtube: {
      display: "none",
    },
    fallback: {
      display: "block",
    },
  });

  const [videoInfo, setVideoInfo] = useState(null);

  const closePop = () => {
    setClose(true);
    hide();
  };

  let time;

  const getGenre = () => {
    if (genre.length == 0) {
      console.log("Sending request for Genre...");
      instance
        .get(`/movie/${id}${API_KEY}&language=en-US`)
        .then((onlineData) => {
          //Set Video id
          setgenre(onlineData.data.genres);
        });
    } else {
      console.log("Already genre sent request...");
    }
  };

  const showVideo = () => {
    if (video == false) {
      console.log("Sending request for trailer...");
      instance
        .get(`/movie/${id}/videos${API_KEY}&language=en-US`)
        .then((onlineData) => {
          console.log(onlineData.data.results[0]);
          //Set Video id
          setVideoID(
            null != onlineData.data.results[0]
              ? onlineData.data.results[0]["key"]
              : "hGOcFPzx1H0"
          );
        });

      setVideo(true);
    } else {
      console.log("Already sent request...");
    }

    console.log(videoID);
    clearTimeout(time);
  };

  const YouTubeReady = (e) => {
    //Setting info on the state
    setVideoInfo(e.target);

    setStyles({
      youtube: {
        display: "",
      },
      fallback: {
        display: "none",
      },
    });
  };

  useEffect(() => {
    if (item != null) {
      //If it passes the condition then make it false
      setClose(false);
      showVideo();
      //request for genres
      getGenre();
    }

    return () => {};
  }, [item]);

  if (item == null) return <span></span>;

  const { id, genre_ids, overview } = item;

  const path =
    item.backdrop_path != null ? item.backdrop_path : item.poster_path;

  return (
    <div className="popup" style={{ display: close ? "none" : "flex" }}>
      <div className="upper">
        <div
          className="close-pop"
          onClick={() => {
            closePop();
          }}
        >
          <i className="material-icons">clear</i>
        </div>

        {video == true && videoID != null ? (
          <div style={styles.youtube}>
            <YouTube
              videoId={videoID}
              opts={{
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                },
                width: ratio(4, 2).width,
                height: ratio(4, 2).height,
              }}
              width="100"
              onReady={(e) => {
                YouTubeReady(e);
              }}
            />
          </div>
        ) : (
          ""
        )}
        <img
          style={styles.fallback}
          className="popup-banner"
          src={posterURL(path, "l")}
        />
      </div>
      <div className="lower">
        <div className="btn_groups">
          <a className="play">
            <i className="material-icons">play_arrow</i>
          </a>
          <a className="add">
            <i className="material-icons">add</i>
          </a>
          <a className="like">
            <i className="material-icons">thumb_up</i>
          </a>
          <a className="dislike">
            <i className="material-icons">thumb_down</i>
          </a>
        </div>
        <div className="genres">
          <ul>
            {genre.length > 0 &&
              genre.map((item, i) => <li key={i}>{item.name}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Popup;
