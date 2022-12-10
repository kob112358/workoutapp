import React, { useEffect, useState, useCallback } from "react";
import Card from "../styles/Card";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ViewSingleWorkout.module.css";
import AddWorkoutLift from "./AddWorkoutLift";
import ViewWorkoutLift from "../components/ViewWorkoutLift";

const ViewSingleWorkout = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({});
  const [showLifts, setShowLifts] = useState(false);
  const [workoutLifts, setWorkoutLifts] = useState([]);
  const [workoutLiftsList, setWorkoutLiftsList] = useState("");

  useEffect(() => {
    fetch(location.pathname)
      .then((res) => res.json())
      .then((data) => setWorkout(data))
      .catch((e) => console.log(e));
  }, [location.pathname]);
  const getWorkoutLifts = useCallback(() => {
    fetch(`${location.pathname}/lift`)
      .then((res) => res.json())
      .then((data) => setWorkoutLifts(data))
      .catch((e) => console.log(e));
  }, [location.pathname]);
  useEffect(() => {
    fetch(`${location.pathname}/lift`)
      .then((res) => res.json())
      .then((data) => setWorkoutLifts(data))
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
  const saveWorkoutLifts = () => {
    setShowLifts(false);
  };
  const addLiftToWorkoutHandler = (id, sets = 0, reps = 0, time = 0, name) => {
    fetch(`${workout._id}/lift`, {
      method: "POST",
      body: JSON.stringify({
        workoutId: workout._id,
        liftId: id,
        name: name,
        sets: sets,
        reps: reps,
        time: time
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => getWorkoutLifts())
      .catch((e) => console.log(e));
  };
  useEffect(
    () => {
      const deleteWorkoutLiftHandler = (liftId) => {
        fetch(`${workout._id}/lift`, {
          method: "DELETE",
          body: JSON.stringify({ id: liftId }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => getWorkoutLifts())
          .catch((e) => console.log("error occured, ", e));
      };
      setWorkoutLiftsList(
        workoutLifts.map((lift) => {
          return (
            <ViewWorkoutLift
              lift={lift}
              deleteWorkoutLift={deleteWorkoutLiftHandler}
              key={lift._id}
              saveWorkout={showLifts}
            />
          );
        })
      )},
    [workoutLifts, showLifts, workout._id, getWorkoutLifts]
  );
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
          {showLifts ? (
            <button onClick={saveWorkoutLifts}>Save Lifts</button>
          ) : (
            <button
              onClick={() => {
                setShowLifts(true);
              }}
            >
              Edit Lifts
            </button>
          )}
          <button onClick={editWorkoutHandler}>Edit</button>
          <button onClick={deleteWorkoutHandler}>Delete</button>
          <button onClick={navigateToAllWorkoutHandler}>Back</button>
        </div>
      </Card>
      {workoutLifts.length > 0 ? (
        workoutLiftsList
      ) : showLifts ? (
        ""
      ) : (
        <>Click edit lifts to add..</>
      )}
      <hr></hr>
      {showLifts ? (
        <AddWorkoutLift addLiftToWorkout={addLiftToWorkoutHandler} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewSingleWorkout;
