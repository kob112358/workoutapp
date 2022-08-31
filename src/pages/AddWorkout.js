import React, { useRef, useContext, useState } from "react";
import styles from "./AddWorkout.module.css";
import AuthContext from "../store/AuthContext";
import { WORKOUT_TAGS } from "../variables/workouttags";

const AddWorkout = () => {
  const workoutName = useRef();
  const workoutNotes = useRef();
  const [workoutTags, setWorkoutTags] = useState(
    new Array(WORKOUT_TAGS.length).fill(false),
  );

  const auth = useContext(AuthContext);

  const saveWorkout = (e) => {
    e.preventDefault();
    const bodyData = JSON.stringify({
      workoutName: workoutName.current.value,
    });
    fetch("/workout/", {
      body: bodyData,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?._id) {
          workoutName.current.value = "";
        }
      })
      .catch((e) => console.log(e));
  };

  const addTagHandler = (e, index) => {
    setWorkoutTags(prevState => {
      let newState = [...prevState];
      newState[index] = e.target.checked;
      return newState;
    })
  };

  return auth.name.length > 0 ? (
    <div>
      <form className={styles.add_workout__form} onSubmit={saveWorkout}>
        <label htmlFor="workoutName">Workout name:</label>
        <input
          id="workoutName"
          type="text"
          placeholder="workout name.."
          ref={workoutName}
          required
        ></input>
        <label htmlFor="notes">Notes:</label>
        <input
          type="text"
          id="notes"
          placeholder="add notes.."
          ref={workoutNotes}
        ></input>
        {WORKOUT_TAGS.map((tag, index) => {
          return (
            <div key={tag}>
              <input
                type="checkbox"
                id={tag}
                onChange={(e) => {
                  addTagHandler(e, index);
                }}
              ></input>
                <label htmlFor={tag}>{tag}</label>
            </div>
          );
        })}
        <button type="submit">Save workout</button>
      </form>
      <hr className={styles.hr_style}></hr>
      <div>placeholder for category selector</div>
    </div>
  ) : (
    <>Please log in</>
  );
};

export default AddWorkout;
