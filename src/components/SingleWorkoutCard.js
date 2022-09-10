import React from "react";
import styles from "./SingleWorkoutCard.module.css";
import Card from "../styles/Card";
import { Link } from "react-router-dom";

const SingleWorkoutCard = ({ workout }) => {
  return (
      <Card>
        <Link to={`/workout/${workout._id}`}>
          <div>Name: {workout.name}</div>
          <div>Creator: {workout.whoCreated}</div>
          <div>
            Tags:
            {workout.tags?.map((tag) => (
              <span key={tag}> {tag}</span>
            ))}
          </div>
        </Link>
      </Card>
  );
};

export default SingleWorkoutCard;
