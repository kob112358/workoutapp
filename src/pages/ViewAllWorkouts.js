import React, { useEffect, useState } from "react";
import styles from "./ViewAllWorkouts.module.css";
import SingleWorkoutCard from "../components/SingleWorkoutCard";

const ViewAllWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("/workout/")
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);

  const workoutList = workouts.length > 0 ? (
    workouts.map((workout) => (
      <SingleWorkoutCard workout={workout} key={workout._id} />
    ))
  ) : (
    <>"Please add workouts.."</>
  );
  return (
    <div>
      <h1>All workouts</h1>
    <div className={styles.view_workouts}>
      {workoutList}
    </div>
    </div>
  );
};

export default ViewAllWorkouts;
