import React, { useRef, useEffect, useState, useContext } from "react";
import styles from "./AddWorkout.module.css";
import AddWorkoutLift from "../components/AddWorkoutLift";
import AuthContext from "../store/AuthContext";
import ViewWorkoutLift from "../components/ViewWorkoutLift";

const AddWorkout = () => {
  const workoutName = useRef();
  const [lifts, setLifts] = useState([]);
  const [liftsToAdd, setLiftsToAdd] = useState([]);
  const [liftsToAddList, setLiftsToAddList] = useState('Add lifts..');
  const auth = useContext(AuthContext);
  useEffect(() => {
    fetch("/lift")
      .then((res) => res.json())
      .then((data) => setLifts(data))
      .catch((e) => console.log(e));
  }, []);
  const addLiftToWorkoutHandler = (id, sets, reps, name) => {
    setLiftsToAdd((prevState) => {
      let newState = prevState.map((lift) => lift);
      return [...newState, { liftId: id, sets: sets, reps: reps, name: name }];
    });
  };
  const saveWorkout = (e) => {
    e.preventDefault();
    const bodyData = JSON.stringify({
      lifts: liftsToAdd,
      workoutName: workoutName.current.value,
    });
    console.log(bodyData);
    fetch("/workout/add", {
      body: bodyData,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };
  const deleteWorkoutLiftHandler = ({ liftId, sets, reps }) => {
    setLiftsToAdd((prevState) => {
      console.log('prevState', prevState);
      let newState = prevState.filter((lift) => {
        if (
          lift.liftId === liftId &&
          lift.reps === reps &&
          lift.sets === sets
        ) {
          return false;
        }
        else {
          return true;
        }
      });
      console.log(newState);
      return newState;
    });
  };
  useEffect(() => setLiftsToAddList(liftsToAdd.map((lift) => {
    return (
      <ViewWorkoutLift
        lift={lift}
        deleteWorkoutLift={deleteWorkoutLiftHandler}
      />
    );
  })), [liftsToAdd]);
  return auth.name.length > 0 ? (
    <div>
      <form className={styles.add_workout__form}>
        <label htmlFor="workoutName">Workout name:</label>
        <input
          id="workoutName"
          type="text"
          placeholder="workout name.."
          ref={workoutName}
          required
        ></input>
        <div className={styles.add_workout__lifts}>
          {liftsToAddList}
        </div>
        <button onClick={saveWorkout}>Save workout</button>
      </form>
      <hr className={styles.hr_style}></hr>
      <div>placeholder for category selector</div>
      <div className={styles.view_all_lifts}>
        {lifts.length > 0
          ? lifts.map((lift) => (
              <AddWorkoutLift
                addLiftToWorkoutHandler={addLiftToWorkoutHandler}
                lift={lift}
              />
            ))
          : ""}
      </div>
    </div>
  ) : (
    <>Please log in</>
  );
};

export default AddWorkout;
