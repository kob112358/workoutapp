import React, { useRef, useEffect, useState, useContext } from "react";
import styles from "./AddWorkout.module.css";
import AddWorkoutLift from "../components/AddWorkoutLift";
import AuthContext from "../store/AuthContext";

const AddWorkout = () => {
  const workoutName = useRef();
  const [lifts, setLifts] = useState([]);
  const auth = useContext(AuthContext);
  console.log(auth);
  useEffect(() => {
    fetch("/lift")
      .then((res) => res.json())
      .then((data) => setLifts(data))
      .catch((e) => console.log(e));
  }, []);
  const addLiftToWorkoutHandler = (id, sets, reps) => {
    setLifts((prevState) => {
      let newState = prevState.map((lift) => {
        if (lift._id === id) {
          lift.reps = reps;
          lift.sets = sets;
          return lift;
        }
        return lift;
      });
      return newState;
    });
  };
  const saveWorkout = (e) => {
    e.preventDefault();
    const liftsToSave = lifts.filter((lift) => lift.reps && lift.sets);
    const bodyData = JSON.stringify({lifts: liftsToSave, workoutName: workoutName.current.value});
    console.log(bodyData);
    fetch("/workout/add", {
      body: bodyData,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };
  return (
    auth.name.length > 0 ? (
    <div>
      <form>
        <label htmlFor="workoutName">Workout name:</label>
        <input
          id="workoutName"
          type="text"
          placeholder="workout name.."
          ref={workoutName}
          required
        ></input>
        <button onClick={saveWorkout}>Save workout</button>
        <div>placeholder for category selector</div>
        {lifts.length > 0
          ? lifts.map((lift, index) => (
              <AddWorkoutLift
                addLiftToWorkoutHandler={addLiftToWorkoutHandler}
                key={index}
                lift={lift}
              />
            ))
          : ""}
      </form>
    </div>) : <>Please log in</>
  );
};

export default AddWorkout;
