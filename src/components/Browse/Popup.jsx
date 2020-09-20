import React, { useState } from "react";
import YouTube from "react-youtube";
import { instance, API_KEY } from "../../API/api";

function Popup({ src, id }) {
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

  let time;

  const showVideo = () => {
    if (video == false) {
      console.log("Sending request...");
      instance
        .get(`/movie/${id}/videos${API_KEY}&language=en-US`)
        .then((onlineData) => {
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

  const hideVideo = () => {
    console.log("Hide video", videoInfo);
    //if (videoInfo != null) videoInfo.pauseVideo();
    //setVideo(false);

    time = setTimeout(() => {
      if (videoInfo != null) videoInfo.pauseVideo();
    }, 1000);
  };

  return (
    <div
      className="popup"
      onMouseOut={() => {
        hideVideo();
      }}
      onMouseOver={() => {
        showVideo();
      }}
    >
      <div className="upper">
        {video == true && videoID != null ? (
          <div style={styles.youtube}>
            <YouTube
              videoId={videoID}
              opts={{
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                },
                width: "100%",
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
        <img style={styles.fallback} className="popup-banner" src={src} />
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
            <li>Action</li>
            <li>Drama</li>
            <li>Horrow</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Popup;
