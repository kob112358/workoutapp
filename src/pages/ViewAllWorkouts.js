import React, { useEffect, useState } from "react";
import styles from "./ViewAllWorkouts.module.css";
import SingleWorkoutCard from "../components/SingleWorkoutCard";
import { useNavigate } from "react-router-dom";
import Card from "../styles/Card";
import SplitCard from "../styles/SplitCard";

const ViewAllWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/workout/")
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);
  const addWorkout = () => {
    navigate("/workout/add");
  };
  const mainPage = () => {
    navigate("/");
  };
  const workoutList =
    workouts.length > 0 ? (
      workouts.map((workout) => (
        <SingleWorkoutCard workout={workout} key={workout._id} />
      ))
    ) : (
      <>"Please add workouts.."</>
    );
  return (
    <div>
      <h1>All workouts</h1>
      <div className={styles.view_workouts}>{workoutList}</div>
      <Card>
        <SplitCard onClick={addWorkout}>
          Add workout
        </SplitCard>
        <SplitCard onClick={mainPage}>
          Back
          </SplitCard>
      </Card>
    </div>
  );
};

export default ViewAllWorkouts;
