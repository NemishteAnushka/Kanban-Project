import { BrowserRouter } from "react-router-dom";
import AppRoute from "./AppRoutes/AppRoute";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);
  return (
    <BrowserRouter basename="/Kanban-Project">
      <AppRoute />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
