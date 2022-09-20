import React from "react";
import styles from "./ViewRoutineWorkout.module.css";
import Card from "../styles/Card";

const ViewRoutineWorkout = ({ workout, deleteRoutineWorkout, saveRoutine }) => {
  const deleteRoutineWorkoutHandler = (e) => {
    e.preventDefault();
    deleteRoutineWorkout(workout._id);
  };
  console.log(workout);
  return (
    <Card>
      <div className={styles.routine_workout}>
        <div>Name: {workout.workoutName?.toLowerCase()}</div>
        <div className={styles.routine_workout_buttons}>
        {saveRoutine ? (<button onClick={deleteRoutineWorkoutHandler}>Delete</button>) : ''}
        </div>
      </div>
    </Card>
  );
};

export default ViewRoutineWorkout;
