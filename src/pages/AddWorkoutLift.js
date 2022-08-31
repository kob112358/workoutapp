import React from "react";
import styles from "./AddWorkoutLift.module.css";
import ViewWorkoutLift from "../components/ViewWorkoutLift";
import WorkoutLift from "../components/WorkoutLift";
import { v1 } from "uuid";
import React, { useEffect, useState } from "react";

const AddWorkoutLift = () => {
  const [lifts, setLifts] = useState([]);
  const [liftsToAdd, setLiftsToAdd] = useState([]);
  const [liftsToAddList, setLiftsToAddList] = useState("");

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
            />
          );
        })
      ),
    [liftsToAdd]
  );
  return auth.name.length > 0 ? (
    <div>
      <div className={styles.view_all_lifts}>
        {lifts.length > 0
          ? lifts.map((lift) => (
              <WorkoutLift
                addLiftToWorkoutHandler={addLiftToWorkoutHandler}
                lift={lift}
                key={v1()}
              />
            ))
          : ""}
      </div>
    </div>
  ) : (
    <div>Please log in</div>
  );
};

export default AddWorkoutLift;
