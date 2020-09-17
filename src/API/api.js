import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = "https://api.themoviedb.org/3";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/";
const API_KEY = "?api_key=413f348ad6d0d374fefac45b431e35fa";

const API_CONSTS = {
  POPULAR: "",
  TRENDING: `/trending/all/week${API_KEY}`,
  NEW_RELEASE: `/movie/top_rated${API_KEY}&language=en-US&page=1$year=2019`,
  ACTION_ADVENTURE: `/discover/movie${API_KEY}&language=en-US&sort_by=popularity.asc&include_adult=true&include_video=true&page=1&with_genres=12%7C28`,
  TV_SERIALS: `/discover/movie${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`,
  DOCUMENTARIES: `/discover/movie${API_KEY}&language=en-US&sort_by=popularity.asc&include_adult=true&include_video=true&page=1&with_genres=99`,
  HINDI_MOVIES: `/discover/movie${API_KEY}&language=hi&sort_by=popularity.asc&include_adult=true&include_video=true&page=1&with_original_language=hi`,
  HORROR_MOVIES: `/discover/movie${API_KEY}&sort_by=popularity.asc&include_adult=true&include_video=true&page=1&with_genres=27`,
};

const posterURL = (part, size = "m") => {
  // supports s, m, l
  switch (size.toLowerCase()) {
    case "s":
      return POSTER_BASE_URL + "w300" + part;
      break;

    case "m":
      return POSTER_BASE_URL + "w780" + part;
      break;

    case "l":
      return POSTER_BASE_URL + "original" + part;
      break;

    default:
      return POSTER_BASE_URL + "w780" + part;
  }
};

//Create base url
const instance = axios.create({
  baseURL: BASE_URL,
});

//Creating cusom hook
const useFetch = (URL, dependencies = []) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    instance.get(URL).then((onlineData) => {
      setData(onlineData.data.results);
    });

    return () => {
      console.log("Clean up performing");
    };
  }, dependencies);

  return data;
};

export { posterURL, instance, API_CONSTS, useFetch };
