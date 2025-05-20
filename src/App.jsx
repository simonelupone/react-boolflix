import React, { useEffect } from "react";
import axios from "axios";

const query = "batman";

//  template to axios config
const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/search/movie",
  params: {
    query: query,
    include_adult: "false",
    language: "en-US",
    page: "1",
  },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmMyZTU3ZjUxZDlkMjU5MTRmMjAzMDVmN2FhYzNlNCIsIm5iZiI6MTcxMzM0NTMxMS41NDgsInN1YiI6IjY2MWY5MzFmZWNhZWY1MDE2M2Y5ODMwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hF4TPGKH5QMB8HY-C3qP6C_RUeIbyJZ5QEa9Mzt4Eqw",
  },
};

const App = () => {
  const getMovies = () => {
    axios
      .request(options)
      .then((response) => {
        console.log(response.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-7xl max-w-sm p-4">
        <form className="w-full max-w-sm">
          <div className="flex items-center border-b border-red-500 py-2">
            <input
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
              className="flex-shrink-0 border-transparent border-4 text-red-500 hover:text-red-800 text-sm py-1 px-2 rounded"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
