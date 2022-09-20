import React from "react";
import styles from "./Lift.module.css";
import {Link} from 'react-router-dom';
import Card from '../styles/Card';

const Lift = ({ lift }) => {
  const { name, _id } = lift;
  
  return (
    <Card>
        <Link to={`/lift/${_id}`}>{name.toLowerCase()}</Link>
    </Card>
  );
};

export default Lift;
