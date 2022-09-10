import React, { useEffect, useState } from "react";
import Card from "../styles/Card";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ViewSingleWorkout.module.css";
import AddWorkoutLift from "./AddWorkoutLift";

const ViewSingleWorkout = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({});
  const [showLifts, setShowLifts] = useState(false);
  useEffect(() => {
    fetch(location.pathname)
      .then((res) => res.json())
      .then((data) => setWorkout(data))
      .catch((e) => console.log(e));
  }, [location.pathname]);
  const deleteWorkoutHandler = () => {
    fetch(location.pathname, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        navigate("/workout/view-all");
      })
      .catch((e) => console.log(e));
  };
  const editWorkoutHandler = () => {
    navigate(`/workout/${workout._id}/edit`);
  };
  const navigateToAllWorkoutHandler = () => {
    navigate("/workout/view-all");
  };
  const addLiftToWorkoutHandler = () => {
    setShowLifts(true);
  }
  const saveWorkoutLifts = () => {
    setShowLifts(false);
  }
  return (
    <>
    <Card>
      <div>Name: {workout.name}</div>
      <div>Notes: {workout.notes}</div>
      <div>Creator: {workout.whoCreated}</div>
      <div>
        Tags:
        {workout.tags?.map((tag) => (
          <span key={tag}> {tag}</span>
        ))}
      </div>
      <div className={styles.workout_buttons}>
        {showLifts ? <button onClick={saveWorkoutLifts}>Save Lifts</button> : <button onClick={addLiftToWorkoutHandler}>Add Lift</button>}
        <button onClick={editWorkoutHandler}>Edit</button>
        <button onClick={deleteWorkoutHandler}>Delete</button>
        <button onClick={navigateToAllWorkoutHandler}>Back</button>
      </div>
    </Card>
    {showLifts ? <AddWorkoutLift /> : ''}
    </>
  );
};

export default ViewSingleWorkout;
