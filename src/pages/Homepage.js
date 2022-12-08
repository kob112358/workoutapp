import React from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

const Homepage = () => {
  return (
    <div className={styles.routes}>
      <Link className={styles.link} to="/workout/555/record">
        Record workout
      </Link>
      <h2>LIFTS</h2>
      <Link className={styles.link} to="/lift/view-all">
        View All Lifts
      </Link>
      <Link className={styles.link} to="/lift/add">
        Add Lift
      </Link>
      <h2>WORKOUTS</h2>
      <Link className={styles.link} to="/workout/view-all">
        View all workouts
      </Link>
      <Link className={styles.link} to="/workout/add">
        Add workout
      </Link>
      <h2>ROUTINES</h2>
      <Link className={styles.link} to="/routine/view-all">
        View all routines
      </Link>
      <Link className={styles.link} to="/routine/add">
        Add routine
      </Link>
    </div>
  );
};

export default Homepage;
