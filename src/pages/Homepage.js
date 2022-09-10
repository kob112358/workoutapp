import React from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

const Homepage = () => {
  return (
    <div className={styles.routes}>
        <Link className={styles.link} to="/lift/view-all">
          View All Lifts
        </Link>
        <Link className={styles.link} to="/lift/add">
          Add Lift
        </Link>
        <Link className={styles.link} to="/lift/add">
          Log workout
        </Link>
        <Link className={styles.link} to="/workout/view-all">
          View all workouts
        </Link>
        <Link className={styles.link} to="/workout/add">
          Create workout
        </Link>
        <div className={styles.link}>Add routines</div>
    </div>
  );
};

export default Homepage;
