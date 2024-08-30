import { Link } from "react-router-dom";
import { SliderProps } from "../../utils/interfaces/components";
import Header from "../../Components/Headers/Standard/header";

function ChildrenAndFamily({ movies }: SliderProps) {
  const filteredMovies = movies.filter(movie => movie.ageRating === "G" || movie.ageRating === "PG");
  
  return (
      <div>
          <Header />
          <div className='mx-5 my-2 text-light display-6'>Children and Family</div>
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

export default ChildrenAndFamily;