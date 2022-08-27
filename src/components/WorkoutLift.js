import React, {useRef, useContext} from "react";

import styles from "./WorkoutLift.module.css";

const WorkoutLift = ({ lift, addLiftToWorkoutHandler }) => {
  const { _id, name } = lift;
  const setsRef = useRef();
  const repsRef = useRef();

  const addLiftToWorkout = (e) => {
    e.preventDefault();
    const sets = setsRef.current.value;
    const reps = repsRef.current.value;
    addLiftToWorkoutHandler(_id, sets, reps);
  }
  return (
    <div className={styles.workout_lift}>
      {name}
      <div>
        <label htmlFor="liftSets"># of sets</label>
        <input id="liftSets" type="number" min={0} max={100} ref={setsRef}></input>
      </div>
      <div>
        <label htmlFor="liftReps"># of reps</label>
        <input id="liftReps" type="number" min={0} max={100} ref={repsRef}></input>
      </div>
      <button onClick={addLiftToWorkout}>Add lift</button>
    </div>
  );
};

export default WorkoutLift;
