import { Navbar, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/authSlice";

function AppNavbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
   const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    dispatch(logoutUser()); 
    navigate("/", { replace: true }); 
  };
  return (
    <Navbar bg="success" expand="lg" className="py-2 px-4">
     
        <Navbar.Brand  className="text-white fw-bold">Kanban</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={()=>{
              navigate('/dashboard')
            }}  className="text-white">Overview</Nav.Link>
            <Nav.Link onClick={()=>{
              navigate('/tasks')
            }}  className="text-white">Task Manager</Nav.Link>
            <Nav.Link onClick={handleLogout}  className="text-white">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
}

export default AppNavbar;
