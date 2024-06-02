import "./MovieCard.css";
import { FirebaseContext } from "../../context/Firebase";
import { useContext } from "react";

const MovieCard = ({ movie, userId, listId }) => {
  const { addMovieToList } = useContext(FirebaseContext);

  const handleAddMovie = async () => {
    if (userId && listId) {
      await addMovieToList(userId, listId, movie);
    }
  };
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={`${movie.Title} poster`} className="movie-poster" />
      <div className="movie-details d-flex justify-content-between">
        <h2 className="movie-title">{movie.Title}</h2>
        <p className="movie-year">{movie.Year}</p>
      </div>
      <button onClick={handleAddMovie}>Add to List</button>
    </div>
  );
};

export default MovieCard;
