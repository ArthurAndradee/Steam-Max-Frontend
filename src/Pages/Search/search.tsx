import { Link } from "react-router-dom";
import { SliderProps } from "../../utils/interfaces/components";
import Header from "../../Components/Headers/Standard/header";
import { useState } from "react";
import { Movie } from "../../utils/interfaces/objects";
import './search.css'

function Search({ movies }: SliderProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
    
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const lowercasedQuery = query.toLowerCase();
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredMovies(results);
  };
  
  return (
      <div>
          <Header />
          <div className="mx-5">
            <input
              type="text"
              className="search-input"
              placeholder="Search for a movie"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className='watchlist-grid m-5'>
              {filteredMovies.map(movie => (
                <Link to={`/titles/${movie.title}`} key={movie.title}>
                  <img src={movie.banner} alt={movie.title} className="watchlist-title-card" />
                </Link>
              ))}
          </div>
      </div>
  );
}

export default Search;