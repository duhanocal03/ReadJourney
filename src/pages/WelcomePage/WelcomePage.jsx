import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div>
      <h1>Read Journey</h1>
      <p>Track your reading journey.</p>
      <Link to="/register">Registration</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};

export default WelcomePage;