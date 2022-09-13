import React, { useRef, useContext, useState } from "react";
import styles from "./AddWorkout.module.css";
import AuthContext from "../store/AuthContext";
import { WORKOUT_TAGS } from "../variables/workouttags";
import { useNavigate } from "react-router-dom";
import Card from "../styles/Card";

const AddWorkout = () => {
  const workoutName = useRef();
  const workoutNotes = useRef();
  const [workoutTags, setWorkoutTags] = useState(
    new Array(WORKOUT_TAGS.length).fill(false)
  );
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const saveWorkout = (e) => {
    e.preventDefault();
    const workoutNameToSave = workoutName.current.value;
    const tagsToSave = WORKOUT_TAGS.filter((tag, index) => {
      return workoutTags[index];
    });
    const bodyData = JSON.stringify({
      workoutName: workoutNameToSave,
      tags: tagsToSave,
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
          navigate(`/workout/${data._id}`);
        }
      })
      .catch((e) => console.log(e));
  };

  const addTagHandler = (e, index) => {
    setWorkoutTags((prevState) => {
      let newState = [...prevState];
      newState[index] = e.target.checked;
      return newState;
    });
  };

  const cancelHandler = () => {
    navigate("/");
  };

  return auth.name.length > 0 ? (
    <Card>
      <form className={styles.add_workout__form} onSubmit={saveWorkout}>
        <div>
        <label htmlFor="workoutName">Name:</label>
        <input
          id="workoutName"
          type="text"
          placeholder="workout name.."
          ref={workoutName}
          required
        ></input>
        </div>
        <div>
        <label htmlFor="notes">Notes:</label>
        <input
          type="textarea"
          id="notes"
          placeholder="add notes.."
          ref={workoutNotes}
        ></input>
        </div>
        <div>
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
        </div>
        <div className={styles.add_workout__buttons}>
          <button type="submit">Save workout</button>
          <button onClick={cancelHandler}>Cancel</button>
        </div>
      </form>
    </Card>
  ) : (
    <>Please log in</>
  );
};

export default AddWorkout;
