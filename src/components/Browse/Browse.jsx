import React, { useState, useEffect } from "react";
import Row from "./Row";
import Banner from "./Banner";
import Nav from "./Nav";
import Loader from "../../Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./browse.scss";
import { API_CONSTS, useFetch } from "../../API/api";

//We may need to shuffle the list so that it looks good
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const bannerInfo = (variable) => {
  let banner_image = "";
  if (variable[0] != null) {
    // Generate a random number
    var i = Math.floor(Math.random() * variable.length - 1);

    // fetch the banner image from there
    banner_image =
      variable[i].backdrop_path != undefined ? variable[i].backdrop_path : null;
    console.log("Found and url was :", banner_image + " and i: " + i);
    let count = 0;
    while (
      banner_image == null ||
      banner_image == "" ||
      banner_image == undefined ||
      count > variable.length - 1
    ) {
      console.log(
        "No image found and url was :",
        banner_image + " and i: " + i
      );
      // Generate a random number
      var i = Math.floor(Math.random() * variable.length - 1);

      // fetch the banner image from there
      banner_image = variable[i].backdrop_path;
      count++;
    }
  }

  return variable[i];
};

function Browse() {
  let loaded = false;
  let loadingState = [];
  const [banner, setBanner] = useState("");

  // pouring all constants via custom hook
  const trends = useFetch(API_CONSTS.TRENDING);
  const newReleases = useFetch(API_CONSTS.NEW_RELEASE);
  const actionAdventures = useFetch(API_CONSTS.ACTION_ADVENTURE);
  const documentaries = useFetch(API_CONSTS.DOCUMENTARIES);
  const tvSerials = useFetch(API_CONSTS.TV_SERIALS);
  const hindi = useFetch(API_CONSTS.HINDI_MOVIES);
  const horror = useFetch(API_CONSTS.HORROR_MOVIES);

  loadingState[0] = trends;
  loadingState[1] = newReleases;
  loadingState[2] = actionAdventures;
  loadingState[3] = documentaries;
  loadingState[4] = tvSerials;
  loadingState[5] = hindi;
  loadingState[6] = horror;

  //setting loading condition
  if (loadingState.length > 0) {
    for (let i = 0; i < loadingState.length; i++) {
      if (loadingState[i].length > 0) {
        loaded = true;
      } else {
        loaded = false;
      }
    }
  }

  // console.log("Now to of browse", loadingState);

  // Filtering the trend to get populars
  let popular = trends && trends.filter(({ vote_average }) => vote_average > 7);

  //Get details for banner

  let title__ = "";
  let details = "";
  let poster = "";

  //Generate random banner
  useEffect(() => {
    console.log("running");

    setBanner(bannerInfo(newReleases));

    return () => {};
  }, [loaded, newReleases]);

  //Jsx return

  return (
    <div className="browse_page">
      {!loaded && <Loader />}

      <Nav />
      <Banner movie={banner} />

      <Row title="Popular on CodageFlix" videos={popular && shuffle(popular)} />
      <Row title="Trending Now" videos={trends} />
      <Row title="New Releases" videos={newReleases} />
      <Row title="Action & Adventures" videos={actionAdventures} />

      <Row title="Documentaries" videos={documentaries} />
      <Row title="Tv Serials" videos={tvSerials} />
      <Row title="Tv Serials" videos={hindi} />
      <Row title="Horror Movies" videos={horror} />
    </div>
  );
}

export default React.memo(Browse, (prev, next) => {
  console.log("prev", prev);
  console.log("next", next);

  return true;
});
