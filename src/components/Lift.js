import React from "react";
import styles from "./Lift.module.css";
import {Link} from 'react-router-dom';

const Lift = ({ lift }) => {
  const { name, _id } = lift;
  
  return (
    <li>
        <Link to={`/lift/${_id}`}>{name}</Link>
    </li>
  );
};

export default Lift;
