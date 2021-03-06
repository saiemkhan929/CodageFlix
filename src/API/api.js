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

const useVideoDetails = (id, dependencies = []) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    instance
      .get(`/movie/${id}/videos${API_KEY}&language=en-US`)
      .then((onlineData) => {
        setData(onlineData.data.results);
      });

    return () => {
      console.log("Clean up performing");
    };
  }, dependencies);

  return data;
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

const Genres = {
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};

export { posterURL, instance, API_CONSTS, useFetch, API_KEY, Genres };
