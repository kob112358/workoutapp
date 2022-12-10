import React from "react";
import styles from "./ViewWorkoutLift.module.css";
import Card from "../styles/Card";

const ViewWorkoutLift = ({ lift, deleteWorkoutLift, saveWorkout }) => {
  const deleteWorkoutLiftHandler = (e) => {
    e.preventDefault();
    deleteWorkoutLift(lift._id);
  };
  let timedOrSets = lift.isTimed ? (
    <>Timed: {lift.time}</>
  ) : (
    <>
      {" "}
      <div>Sets: {lift.sets}</div>
      <div>Reps: {lift.reps}</div>
    </>
  );
  return (
    <Card>
      <div className={styles.workout_lift}>
        <div>Name: {lift.liftName.toLowerCase()}</div>
        {timedOrSets}
        <div className={styles.workout_lift_buttons}>
          {saveWorkout ? (
            <button onClick={deleteWorkoutLiftHandler}>Delete</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </Card>
  );
};

export default ViewWorkoutLift;
