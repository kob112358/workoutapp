import React, { useRef } from "react";
import styles from "./WorkoutLift.module.css";
import Card from "../styles/Card";

const WorkoutLift = ({ lift, addLiftToWorkout }) => {
  const { _id, name, isTimed } = lift;
  const setsRef = useRef();
  const repsRef = useRef();
  const timeRef = useRef();

  const addLiftToWorkoutHandler = (e) => {
    e.preventDefault();
    const sets = parseInt(setsRef.current.value);
    const reps = parseInt(repsRef.current.value);
    const time = parseInt(timeRef.current.value);

    if (isTimed) {
      if (isNaN(time) || time < 0 || time > 18000) {
        alert("Your time must be a number within the range of 0-18000");
        return;
      }
    } else {
      if (isNaN(sets) || sets < 0 || sets > 100) {
        alert("Your sets must be a number within the range of 0-100");
        return;
      }
      if (isNaN(reps) || reps < 0 || reps > 100) {
        alert("Your reps must be a number within the range of 0-100");
        return;
      }
    }

    addLiftToWorkout(_id, sets, reps, time, name);
    setsRef.current.value = 0;
    repsRef.current.value = 0;
  };

  const timeOrReps = isTimed ? (
    <>
      <div>
        <label htmlFor="liftTime">Amount of time (secs) </label>
        <input
          id="liftTime"
          type="number"
          min={0}
          max={18000}
          ref={setsRef}
        ></input>
      </div>
    </>
  ) : (
    <>
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
    </>
  );
  return (
    <Card>
      <div className={styles.add_workout__lift_name}>{name.toLowerCase()}</div>
      {timeOrReps}
      <button onClick={addLiftToWorkoutHandler}>Add lift</button>
    </Card>
  );
};

export default WorkoutLift;
