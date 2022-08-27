import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";

const Navbar = ({ user }) => {
  const { name } = useContext(AuthContext);
  const logout = (e) => {
    e.preventDefault();
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <span className={styles.logo}>Workout Buddy</span>
      </Link>
      <ul className={styles.list}>
        {user ? (
          <>
            <li className={styles.listItem}>Welcome, {name ? name : ""}</li>
            <li onClick={logout}>Logout</li>
          </>
        ) : (
          <li>
            <Link to="/login" className={styles.listItem}>
              Log in
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
