import React, { useRef } from "react";
import styles from "./WorkoutLift.module.css";
import Card from "../styles/Card";

const WorkoutLift = ({ lift, addLiftToWorkout }) => {
  const { _id, name } = lift;
  const setsRef = useRef();
  const repsRef = useRef();

  const addLiftToWorkoutHandler = (e) => {
    e.preventDefault();
    const sets = parseInt(setsRef.current.value);
    const reps = parseInt(repsRef.current.value);
    if (isNaN(sets) || sets < 0 || sets > 100) {
      alert("Your sets must be a number within the range of 0-100");
      return;
    }
    if (isNaN(reps) || reps < 0 || reps > 100) {
      alert("Your reps must be a number within the range of 0-100");
      return;
    }
    addLiftToWorkout(_id, sets, reps, name);
    setsRef.current.value = 0;
    repsRef.current.value = 0;
  };
  return (
    <Card>
      <div className={styles.add_workout__lift_name}>{name.toLowerCase()}</div>
      <div>
        <label htmlFor="liftSets"># of sets </label>
        <input
          id="liftSets"
          type="number"
          min={0}
          max={100}
          ref={setsRef}
        ></input>
      </div>
      <div>
        <label htmlFor="liftReps"># of reps </label>
        <input
          id="liftReps"
          type="number"
          min={0}
          max={100}
          ref={repsRef}
        ></input>
      </div>
      <button onClick={addLiftToWorkoutHandler}>Add lift</button>
    </Card>
  );
};

export default WorkoutLift;
