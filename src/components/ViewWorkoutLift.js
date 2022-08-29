import React from "react";
import styles from './ViewWorkoutLift.module.css';

const ViewWorkoutLift = ({ lift, deleteWorkoutLift }) => {
    const deleteWorkoutLiftHandler = (e) => {
        e.preventDefault();
        deleteWorkoutLift(lift);
    }

  return (
    <div className={styles.workout_lift}>
      <div>Name: {lift.name}</div>
      <div>Sets: {lift.sets}</div>
      <div>Reps: {lift.reps}</div>
      <button>Edit</button>
      <button onClick={deleteWorkoutLiftHandler}>Delete</button>
    </div>
  );
};

export default ViewWorkoutLift;
