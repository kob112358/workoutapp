import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditSingleWorkout.module.css";
import Card from "../styles/Card";
import { WORKOUT_TAGS } from "../variables/workouttags";

const EditSingleWorkout = () => {
  const navigate = useNavigate();
  const params = useParams();
  const workoutName = useRef();
  const [workout, setWorkout] = useState({});
  const [workoutTags, setWorkoutTags] = useState(
    new Array(WORKOUT_TAGS.length).fill(false)
  );
  useEffect(() => {
    fetch(`/workout/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setWorkoutTags(WORKOUT_TAGS.map(tag => data.tags.includes(tag)));
      })
      .catch((e) => console.log(e));
  }, [params.id]);
  const navigateToAllWorkoutHandler = () => {
    navigate("/workout/view-all");
  };
  const editTagHandler = (e, index) => {
    setWorkoutTags((prevState) => {
      let newTags = [...prevState];
      newTags[index] = e.target.checked;
      return newTags;
    });
  };
  const saveWorkoutHandler = () => {
    const updatedTags = WORKOUT_TAGS.filter((tag, index) => workoutTags[index]);
    console.log(updatedTags);
    const workoutToEdit = {
      name: workoutName.current.value,
      tags: updatedTags,
      _id: params.id
    };
    fetch(`http://localhost:5000/workout/${params.id}`, {
      body: JSON.stringify(workoutToEdit),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate(`/workout/${workout._id}`);
      })
      .catch((e) => console.log(e));
  };
  return workout ? (
    <Card>
      <div>
        <label htmlFor="workoutName">Name:</label>
        <input
          type="text"
          defaultValue={workout?.name}
          id="workoutName"
          ref={workoutName}
        ></input>
      </div>
      <div>Creator: {workout.whoCreated}</div>
      <div>
        Tags:
        {WORKOUT_TAGS.map((tag, index) => {
          return (
            <div key={tag}>
              <input
                type="checkbox"
                id={tag}
                value={tag}
                name={tag}
                defaultChecked={workout.tags?.includes(tag)}
                onChange={(e) => {
                  editTagHandler(e, index);
                }}
              ></input>
              <label htmlFor={tag}>{tag}</label>
            </div>
          );
        })}
      </div>
      <button onClick={saveWorkoutHandler}>Save</button>
      <button onClick={navigateToAllWorkoutHandler}>Cancel</button>
    </Card>
  ) : (
    <div>Loading workout...</div>
  );
};

export default EditSingleWorkout;
