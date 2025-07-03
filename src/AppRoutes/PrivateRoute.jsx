import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const userString = localStorage.getItem("loggedInUser");
  const user = userString ? JSON.parse(userString) : null;

  return user ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
