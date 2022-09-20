import React from "react";
import styles from "./SingleRoutineCard.module.css";
import Card from "../styles/Card";
import { Link } from "react-router-dom";

const SingleRoutineCard = ({ routine }) => {
  return (
      <Card>
        <Link to={`/routine/${routine._id}`}>
          <div>Name: {routine.name}</div>
          <div>Creator: {routine.whoCreated}</div>
        </Link>
      </Card>
  );
};

export default SingleRoutineCard;
