import Navbar from "../../components/navbar/Navbar";
import MovieCard from "../../components/moviecard/MovieCard";
import CreateList from "../../components/createlist/CreateList";
import ListDetails from "../../components/listdetails/ListDetails";
import { BiCameraMovie } from "react-icons/bi";
import { CiCircleList } from "react-icons/ci";
import { MdOutlineSocialDistance } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../context/Firebase";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null); // State to store the current user
  const { firebaseAuth, getUserLists, getMoviesFromList } = useContext(FirebaseContext);
  const [searchTitle, setSearchTitle] = useState(""); // State to store the search title
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const [userLists, setUserLists] = useState([]); // State to store user's lists
  const [showListDetails, setShowListDetails] = useState(false);
  const [openList, setOpenList] = useState(null);
  const [tab, setTab] = useState("Home");
  const userId = user?.uid;
  // console.log("userId: ", userId);
  // console.log("seachTItle: ", searchTitle);
  // console.log("selectedListId: ", selectedListId);
  // console.log("userLists: ", userLists);
  console.log("tab: ", tab);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setUser(user); // Update the user state
    });

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, [firebaseAuth]);

  useEffect(() => {
    if (userId) {
      // Fetch user lists when user is set
      const unsubscribeLists = getUserLists(userId, (lists) => {
        setUserLists(lists);
        // Set the most recently created list as selected by default
        if (lists.length > 0) {
          const latestList = lists.sort((a, b) => b.createdAt - a.createdAt)[0];
          setSelectedListId(latestList.id);
        }
      });

      // Cleanup function to unsubscribe from the listener
      return () => unsubscribeLists();
    }
  }, [userId, getUserLists]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTitle}&apikey=e2b4cf35`);
      const data = await response.json();
      setSearchedMovies(data.Search);
      // console.log("searchedMovies: ", searchedMovies);
    };
    fetchData();
  }, [searchTitle]);

  const handleOpenList = (list) => {
    setOpenList(list);
    setShowListDetails(true);
  };

  return (
    <div className="home">
      <Navbar user={user} tab={tab} setTab={setTab} />
      {user ? (
        <>
          {showListDetails && <ListDetails showListDetails={showListDetails} onClose={() => setShowListDetails(false)} userId={userId} openList={openList} />}
          {showPopup && <CreateList showPopup={showPopup} onClose={() => setShowPopup(false)} userId={userId} />}
          <div className="search-area row mx-5 my-3">
            {tab === "Home" && (
              <div className="search-left col-8">
                <div className="search-box">
                  <input placeholder="Search Movies" type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                </div>
                <div className="search-cards">
                  {searchTitle === "" && (
                    <div className="search-placeholder">
                      <h3>Search for your favorite movies</h3>
                      <p>Start typing in the search box above to find movies</p>
                    </div>
                  )}
                  {searchedMovies?.map((movie) => (
                    <MovieCard movie={movie} userId={userId} listId={selectedListId} />
                  ))}
                </div>
              </div>
            )}
            {tab === "Lists" && (
              <div className="all-lists col-8">
                <h1>All Lists</h1>
              </div>
            )}
            {tab === "About" && (
              <div className="about col-8">
                <h1>About</h1>
              </div>
            )}
            {tab === "Contact" && (
              <div className="contact col-8">
                <h1>Contact</h1>
              </div>
            )}
            <div className="search-right col-4">
              <div className="list-container">
                <h3>My Lists</h3>
                <button onClick={() => setShowPopup(true)}>Create a New List</button>
                <div className="list-cards">
                  {userLists.map((list) => (
                    <div key={list.id} className={`list-card ${selectedListId === list.id ? "selected-list" : ""}`} onClick={() => setSelectedListId(list.id)}>
                      <h5>{list.listName}</h5>
                      <p>{list.movieCount} Movies</p>
                      <button onClick={() => handleOpenList(list)}>Open</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="main-content row m-0">
          <div className="main-left col-6 d-flex align-items-center justify-content-center px-5">
            <div className="main-left_content">
              <h1>Let's Make Your Own Movie Library</h1>
              <p>You can search movies, create your own Private and Public Lists and watch what others are cooking</p>
              <Link to="/signup">
                <button>Start Here</button>
              </Link>
            </div>
          </div>
          <div className="main-right col-6 d-flex align-items-center justify-content-center">
            <div className="main-right_content">
              <div className="d-flex align-items-center gap-2">
                <div className="right-icon">
                  <BiCameraMovie />
                </div>
                <div className="right-text">Countless Movie Choices</div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="right-icon">
                  <CiCircleList />
                </div>
                <div className="right-text">Create Public and Private Movie Lists</div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="right-icon">
                  <MdOutlineSocialDistance />
                </div>
                <div className="right-text">Watch what others are cooking in their Lists</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
