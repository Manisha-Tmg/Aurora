import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "../button/Button";
import "../navbar/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="left-container">
        <img src={logo} alt={logo} />
      </div>
      <div className="right-container">
        <ul className="nav-links">
          <li>
            <NavLink
              to={"/home"}
              className={({ isActive }) => (isActive ? "isActive" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/home"}>About Us</NavLink>
          </li>
          <li>
            <NavLink to={"/home"}>Collections</NavLink>
          </li>
          <Button label={"Log In"} className={"btn-nav"} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
