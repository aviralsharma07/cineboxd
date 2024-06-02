import "./SignUp.css";
import { useState, useContext } from "react";
import { FirebaseContext } from "../../../context/Firebase";
import { useNavigate, Link } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signUp } = useContext(FirebaseContext);
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const user = await signUp(email, password, username);
  //   if (user) {
  //     navigate("/");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp(email, password, username);
      if (user) {
        toast.success("Sign up successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Sign up failed! Please check your credentials.");
    }
  };

  return (
    <div className="signup-container">
      <Link to="/">
        <div className="logo text-center mb-4">
          <RiMovie2Line />
          Cineboxd
        </div>
      </Link>
      <div className="signup">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="username">
            <label>Username</label>
            <input type="text" placeholder="Your Username Here" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="email">
            <label>Email</label>
            <input type="text" placeholder="Your Email Here" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="password">
            <label>Password</label>
            <input type="password" placeholder="Your Password Here" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button>Sign Up</button>
        </form>
        <div className="have-account">
          <span>Already have an account?</span>
          <a href="/login">Log In</a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
