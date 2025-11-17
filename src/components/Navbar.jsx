import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">User App</div>
      <div className="nav-links">
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/create" className="nav-item">Create User</NavLink>
        <NavLink to="/users" className="nav-item">User Table</NavLink>
      </div>
    </nav>
  );
}
