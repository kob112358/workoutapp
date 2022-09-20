import React, { useEffect, useState, useCallback } from "react";
import Card from "../styles/Card";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ViewSingleRoutine.module.css";
import AddRoutineWorkout from "./AddRoutineWorkout";
import ViewRoutineWorkout from "../components/ViewRoutineWorkout";

const ViewSingleRoute = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [routine, setRoutine] = useState({});
    const [showWorkouts, setShowWorkouts] = useState(false);
    const [routineWorkouts, setRoutineWorkouts] = useState([]);
    const [routineWorkoutsList, setRoutineWorkoutsList] = useState("");
  
    useEffect(() => {
      fetch(location.pathname)
        .then((res) => res.json())
        .then((data) => setRoutine(data))
        .catch((e) => console.log(e));
    }, [location.pathname]);
    const getRoutineWorkouts = useCallback(() => {
      fetch(`${location.pathname}/workout`)
        .then((res) => res.json())
        .then((data) => setRoutineWorkouts(data))
        .catch((e) => console.log(e));
    }, [location.pathname]);
    useEffect(() => {
      fetch(`${location.pathname}/workout`)
        .then((res) => res.json())
        .then((data) => setRoutineWorkouts(data))
        .catch((e) => console.log(e));
    }, [location.pathname]);
    const deleteRoutineHandler = () => {
      fetch(location.pathname, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          navigate("/routine/view-all");
        })
        .catch((e) => console.log(e));
    };
    const editRoutineHandler = () => {
      navigate(`/routine/${routine._id}/edit`);
    };
    const navigateToAllRoutineHandler = () => {
      navigate("/routine/view-all");
    };
    const saveRoutineWorkouts = () => {
      setShowWorkouts(false);
    };
    const addWorkoutToRoutineHandler = (id, name) => {
      fetch(`${routine._id}/workout`, {
        method: "POST",
        body: JSON.stringify({
          routineId: routine._id,
          workoutId: id,
          name: name
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => getRoutineWorkouts())
        .catch((e) => console.log(e));
    };
    useEffect(
      () => {
        const deleteRoutineWorkoutHandler = (workoutId) => {
          fetch(`${routine._id}/workout`, {
            method: "DELETE",
            body: JSON.stringify({ id: workoutId }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((data) => getRoutineWorkouts())
            .catch((e) => console.log("error occured, ", e));
        };
        setRoutineWorkoutsList(
          routineWorkouts.map((workout) => {
            return (
              <ViewRoutineWorkout
                workout={workout}
                deleteRoutineWorkout={deleteRoutineWorkoutHandler}
                key={workout._id}
                saveRoutine={showWorkouts}
              />
            );
          })
        )},
      [routineWorkouts, showWorkouts, routine._id, getRoutineWorkouts]
    );
    return (
      <>
        <Card>
          <div>Name: {routine.name}</div>
          <div>Notes: {routine.notes}</div>
          <div>Creator: {routine.whoCreated}</div>
          <div>
            Tags:
            {routine.tags?.map((tag) => (
              <span key={tag}> {tag}</span>
            ))}
          </div>
          <div className={styles.routine_buttons}>
            {showWorkouts ? (
              <button onClick={saveRoutineWorkouts}>Save Workouts</button>
            ) : (
              <button
                onClick={() => {
                  setShowWorkouts(true);
                }}
              >
                Edit Workouts
              </button>
            )}
            <button onClick={editRoutineHandler}>Edit</button>
            <button onClick={deleteRoutineHandler}>Delete</button>
            <button onClick={navigateToAllRoutineHandler}>Back</button>
          </div>
        </Card>
        {routineWorkouts.length > 0 ? (
          routineWorkoutsList
        ) : showWorkouts ? (
          ""
        ) : (
          <>Click edit workouts to add..</>
        )}
        <hr></hr>
        {showWorkouts ? (
          <AddRoutineWorkout addWorkoutToRoutine={addWorkoutToRoutineHandler} />
        ) : (
          <></>
        )}
      </>
    );
  };

export default ViewSingleRoute;