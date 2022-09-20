import React, { useRef } from "react";
import styles from "./RoutineWorkout.module.css";
import Card from "../styles/Card";

const RoutineWorkout = ({ workout, addWorkoutToRoutine }) => {
  const { _id, name } = workout;
  const addWorkoutToRoutineHandler = (e) => {
    e.preventDefault();
    addWorkoutToRoutine(_id, name);
  };
  return (
    <Card>
      <div className={styles.add_routine__workout_name}>{name.toLowerCase()}</div>
      <button onClick={addWorkoutToRoutineHandler}>Add workout</button>
    </Card>
  );
};

export default RoutineWorkout;
