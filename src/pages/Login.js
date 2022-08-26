import React from "react";
import styles from "./Login.module.css";

const Login = () => {
    const google = (e) => {
        e.preventDefault();
        window.open("http://localhost:5000/auth/google", "_self");
    }
    const github = (e) => {
        e.preventDefault();
        window.open("http://localhost:5000/auth/github", "_self");
    }
  return (
    <div className={styles.nav}>
      <h1>Choose login method</h1>
      <div onClick={google} className={styles.auth}>Google</div>
      <div onClick={github} className={styles.auth}>Github</div>
      <input type="text" placeholder="Username"></input>
      <input type="text" placeholder="Password"></input>
      <button type="submit">Login</button>
    </div>
  );
};

export default Login;
