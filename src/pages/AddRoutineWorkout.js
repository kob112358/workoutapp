import styles from "./AddRoutineWorkout.module.css";

import RoutineWorkout from "../components/RoutineWorkout";
import { v1 } from "uuid";
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../store/AuthContext";

const AddRoutineWorkout = ({addWorkoutToRoutine}) => {
  const [workouts, setWorkouts] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch("/workout")
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((e) => console.log(e));
  }, []);


  return auth.name.length > 0 ? (
      <div className={styles.view_all_workouts}>
        <>Available workouts</>
        {workouts.length > 0
          ? workouts.map((workout) => (
              <RoutineWorkout
                addWorkoutToRoutine={addWorkoutToRoutine}
                workout={workout}
                key={v1()}
              />
            ))
          : ""}
      </div>
  ) : (
    <div>Please log in</div>
  );
};

export default AddRoutineWorkout;
