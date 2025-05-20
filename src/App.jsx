import { useState } from "react";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmMyZTU3ZjUxZDlkMjU5MTRmMjAzMDVmN2FhYzNlNCIsIm5iZiI6MTcxMzM0NTMxMS41NDgsInN1YiI6IjY2MWY5MzFmZWNhZWY1MDE2M2Y5ODMwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hF4TPGKH5QMB8HY-C3qP6C_RUeIbyJZ5QEa9Mzt4Eqw";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const getMovies = (e) => {
    e.preventDefault();

    //  template to axios config
    const options = {
      method: "GET",
      url: `${API_URL}`,
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
    };

    axios
      .request(options)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClearInput = () => {
    setQuery("");
    setMovies([]);
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
        <form className="w-full" onSubmit={getMovies}>
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
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="my-2 p-4 border border-gray-500 rounded-lg bg-neutral-200"
              >
                <div>
                  Title: <span>{movie.title}</span>
                </div>

                <div>
                  Original Title: <span>{movie.original_title}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>Language: </span>
                  <img
                    src={`https://flagcdn.com/w20/${handleCountryCodes(movie.original_language)}.png`}
                    alt=""
                  />
                </div>

                <div>
                  Rating: <span>{movie.vote_average}</span>
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
