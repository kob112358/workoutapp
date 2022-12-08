import React from "react";
import styles from "./RecordWorkout.module.css";
import Card from "../styles/Card";

export const RecordWorkout = () => {
  let currentTime = new Date();

  //this will be lift data
  const exampleData = {
    workoutName: "Day 1",
    lift: "Bench Press",
    sets: 5,
    reps: 8,
    weight: 120,
    isTimed: true,
    timeInSeconds: 60,
    startTime: currentTime.toLocaleTimeString(),
  };

  const saveLift = () => {};

  const repsOrTimed = exampleData.isTimed ? (
    <>
      <h3>
        Time: <span>{exampleData.timeInSeconds}</span>s
      </h3>
    </>
  ) : (
    <>
      {" "}
      <h2>{exampleData.sets}</h2>
      <h3>
        Reps<span>+</span> {exampleData.reps} <span>-</span>
      </h3>
      <h3>
        Weight <span>+</span> {exampleData.weight} lbs <span>-</span>
      </h3>
    </>
  );

  return (
    <>
      <Card>
        <h1>{exampleData.workoutName}</h1>
        <h2>{exampleData.lift}</h2>

        {repsOrTimed}
        <div className={styles.recordlift_buttons}>
          <button onClick={saveLift}>Save lift</button>
          <h4>Start time: {exampleData.startTime}</h4>
        </div>
      </Card>
      <h1>{}</h1>
    </>
  );
};
