import React, { useEffect, useState } from "react";
import Card from "../styles/Card";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ViewSingleWorkout.module.css";
import AddWorkoutLift from "./AddWorkoutLift";
import { v1 } from "uuid";
import ViewWorkoutLift from "../components/ViewWorkoutLift";

const ViewSingleWorkout = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({});
  const [showLifts, setShowLifts] = useState(false);
  const [liftsToAdd, setLiftsToAdd] = useState([]);
  const [liftsToAddList, setLiftsToAddList] = useState("");

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
  const saveWorkoutLifts = () => {
    const workoutLift = liftsToAdd.map(lift => {return ({
      liftId: lift.liftId,
      name: lift.name,
      reps: lift.reps,
      sets: lift.sets,
      workout: workout._id
    })});
    console.log(workoutLift);
    //fetch(`http://localhost:5000/workout/${workout._id}`, {method: 'POST', body: JSON.stringify({})})
    setShowLifts(false);
  };
  const addLiftToWorkoutHandler = (id, sets, reps, name) => {
    setLiftsToAdd((prevState) => {
      let newState = prevState.map((lift) => lift);
      return [...newState, { liftId: id, sets: sets, reps: reps, name: name }];
    });
  };
  const deleteWorkoutLiftHandler = ({ liftId, sets, reps }) => {
    setLiftsToAdd((prevState) => {
      let newState = prevState.filter((lift) => {
        if (
          lift.liftId === liftId &&
          lift.reps === reps &&
          lift.sets === sets
        ) {
          return false;
        } else {
          return true;
        }
      });
      return newState;
    });
  };
  useEffect(
    () =>
      setLiftsToAddList(
        liftsToAdd.map((lift) => {
          return (
            <ViewWorkoutLift
              lift={lift}
              deleteWorkoutLift={deleteWorkoutLiftHandler}
              key={v1()}
              saveWorkout={showLifts}
            />
          );
        })
      ),
    [liftsToAdd, showLifts]
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
      {liftsToAddList.length > 0 ? (
        liftsToAddList
      ) : (
        showLifts ? '' : <>Click edit lifts to add..</>
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
