import React from "react";
import styles from "./Lift.module.css";
import {Link} from 'react-router-dom';

const Lift = ({ lift }) => {
  const { name, _id } = lift;
  
  return (
    <>
        <Link className={styles.lift_card} to={`/lift/${_id}`}>{name.toLowerCase()}</Link>
    </>
  );
};

export default Lift;
