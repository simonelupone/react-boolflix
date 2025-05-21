import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const API_URL = "https://api.themoviedb.org/3/search/";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmMyZTU3ZjUxZDlkMjU5MTRmMjAzMDVmN2FhYzNlNCIsIm5iZiI6MTcxMzM0NTMxMS41NDgsInN1YiI6IjY2MWY5MzFmZWNhZWY1MDE2M2Y5ODMwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hF4TPGKH5QMB8HY-C3qP6C_RUeIbyJZ5QEa9Mzt4Eqw";

const App = () => {
  const [query, setQuery] = useState("");
  const [media, setMedia] = useState([]);

  const getMedia = (e) => {
    e.preventDefault();

    // this function (options taken from 'the movie database' docs) handles 2 params to
    // set multiple request parameters.
    // type is @string that identifies /tv or /movie
    const handleOptions = (type) => ({
      method: "GET",
      url: API_URL + type,
      params: {
        query: query,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    // define axios requests alias with a specific argument that is the config (options)
    const movieRequest = axios.request(handleOptions("movie"));
    const tvRequest = axios.request(handleOptions("tv"));

    // use Promise.all that is a static method to make multiple requests.
    // it accepts an array of promises -> movieReq and tvReq
    Promise.all([movieRequest, tvRequest])
      // two arguments in arrow function to split response
      .then(([movieResponse, tvResponse]) => {
        // save the responses
        const movies = movieResponse.data.results;
        const tvShows = tvResponse.data.results;

        console.log(movies);
        console.log(tvShows);

        setMedia([...movies, ...tvShows]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClearInput = () => {
    setQuery("");
    setMedia([]);
  };

  const handleCountryCodes = (code) => {
    switch (code) {
      case "en":
        return "gb";
      case "ja":
        return "jp";
      case "uk":
        return "ua";
      default:
        return code;
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-3xl p-4">
        <form className="w-full" onSubmit={getMedia}>
          <div className="flex items-center border-b border-red-500 py-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Search..."
            />
            <button
              className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Search
            </button>
            <button
              onClick={handleClearInput}
              className="flex-shrink-0 border-transparent border-4 text-red-500 hover:text-red-800 text-sm py-1 px-2 rounded"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>

        <div>
          <h1 className="my-4 font-black text-xl">Movies</h1>

          <ul>
            {media.map((m) => (
              <li
                key={m.id}
                className="my-2 p-4 flex justify-between items-center border border-gray-500 rounded-lg bg-neutral-200"
              >
                <div>
                  <div>
                    <span>Title: </span>
                    <span>{m.title || m.name}</span>
                  </div>

                  <div>
                    <span>Original Title: </span>
                    <span>{m.original_title || m.original_name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Language: </span>
                    <img
                      src={`https://flagcdn.com/w20/${handleCountryCodes(m.original_language)}.png`}
                      alt=""
                    />
                  </div>

                  <div>
                    <span>Rating: </span>
                    {[1, 2, 3, 4, 5].map((starIndex) => {
                      const rating = m.vote_average / 2;

                      return (
                        <span key={starIndex}>
                          {rating >= starIndex ? (
                            <FontAwesomeIcon icon={faStar} color={"#FFC300"} />
                          ) : rating > starIndex - 0.5 ? (
                            <FontAwesomeIcon
                              icon={faStarHalfAlt}
                              color={"#FFC300"}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faStarRegular}
                              color={"#FFC300"}
                            />
                          )}
                        </span>
                      );
                    })}
                    <span> ({m.vote_average / 2})</span>
                  </div>
                </div>

                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w92/${m.poster_path}`}
                    alt=""
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
