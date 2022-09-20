import styles from './ViewAllRoutines.module.css';
import React, { useEffect, useState } from "react";
import SingleRoutineCard from "../components/SingleRoutineCard";
import { useNavigate } from "react-router-dom";
import Card from "../styles/Card";
import SplitCard from "../styles/SplitCard";

const ViewAllRoutines = () => {
    const [routines, setRoutines] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      fetch("/routine/")
        .then((res) => res.json())
        .then((data) => setRoutines(data));
    }, []);
    const addRoutine = () => {
      navigate("/routine/add");
    };
    const mainPage = () => {
      navigate("/");
    };
    const routineList =
      routines.length > 0 ? (
        routines.map((routine) => (
          <SingleRoutineCard routine={routine} key={routine._id} />
        ))
      ) : (
        <>"Please add routines.."</>
      );
    return (
      <div>
        <h1>All routines</h1>
        <div className={styles.view_routines}>{routineList}</div>
        <Card>
          <SplitCard onClick={addRoutine}>
            Add routine
          </SplitCard>
          <SplitCard onClick={mainPage}>
            Back
            </SplitCard>
        </Card>
      </div>
    );
  };

export default ViewAllRoutines;