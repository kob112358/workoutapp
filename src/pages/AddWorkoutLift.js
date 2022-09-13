import styles from "./AddWorkoutLift.module.css";

import WorkoutLift from "../components/WorkoutLift";
import { v1 } from "uuid";
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../store/AuthContext";

const AddWorkoutLift = ({addLiftToWorkout}) => {
  const [lifts, setLifts] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch("/lift")
      .then((res) => res.json())
      .then((data) => setLifts(data))
      .catch((e) => console.log(e));
  }, []);


  return auth.name.length > 0 ? (
      <div className={styles.view_all_lifts}>
        <>Available lifts</>
        {lifts.length > 0
          ? lifts.map((lift) => (
              <WorkoutLift
                addLiftToWorkout={addLiftToWorkout}
                lift={lift}
                key={v1()}
              />
            ))
          : ""}
      </div>
  ) : (
    <div>Please log in</div>
  );
};

export default AddWorkoutLift;
