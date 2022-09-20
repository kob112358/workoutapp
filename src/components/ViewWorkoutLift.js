import React from "react";
import styles from "./ViewWorkoutLift.module.css";
import Card from "../styles/Card";

const ViewWorkoutLift = ({ lift, deleteWorkoutLift, saveWorkout }) => {
  const deleteWorkoutLiftHandler = (e) => {
    e.preventDefault();
    deleteWorkoutLift(lift._id);
  };
  console.log(lift);
  return (
    <Card>
      <div className={styles.workout_lift}>
        <div>Name: {lift.liftName.toLowerCase()}</div>
        <div>Sets: {lift.sets}</div>
        <div>Reps: {lift.reps}</div>
        <div className={styles.workout_lift_buttons}>
        {saveWorkout ? (<button onClick={deleteWorkoutLiftHandler}>Delete</button>) : ''}
        </div>
      </div>
    </Card>
  );
};

export default ViewWorkoutLift;
