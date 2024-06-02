import "./ListDetails.css";
import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../context/Firebase";
import MovieCard from "../moviecard/MovieCard";

const ListDetails = ({ onClose, openList, showListDetails, userId }) => {
  const { getMoviesFromList } = useContext(FirebaseContext);
  const [movies, setMovies] = useState([]);
  console.log("movies", movies);
  console.log("openList", openList);

  useEffect(() => {
    // Fetch movies for the selected list
    const unsubscribe = getMoviesFromList(userId, openList?.id, (movies) => {
      setMovies(movies);
    });

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, [openList?.id]);

  return (
    <div className="list-details">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <h1 className="list-name">{openList?.listName}</h1>
      <div className="movie-cards">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} userId={userId} listId={openList?.id} />
        ))}
      </div>
    </div>
  );
};

export default ListDetails;
