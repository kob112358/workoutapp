import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ViewSingleLift.module.css";

const ViewSingleLift = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [lift, setLift] = useState({});
  useEffect(() => {
    const getLift = () => {
      fetch(`/lift/${params.id}`)
        .then((res) => res.json())
        .then((data) => setLift(data))
        .catch((e) => console.log(e));
    };
    getLift();
  }, [params]);
  const { name, notes, primary, secondary, whoCreated } = lift;
  const primarySnippet =
    primary && primary.length > 0 ? (
      <>PRIMARY MUSCLE: {primary.map((x) => `${x} `)}</>
    ) : (
      ""
    );
  const secondarySnippet =
    secondary && secondary.length > 0 ? (
      <>SECONDARY MUSCLE: {secondary.map((x) => `${x} `)}</>
    ) : (
      ""
    );
  const noteSnippet = notes ? <>NOTES: {notes}</> : "";
  const editHandler = () => {
    navigate(`/lift/${lift._id}/edit`);
  };
  const deleteHandler = async () => {
    await fetch(`/lift/${params.id}`, { method: "DELETE" })
      .then((res) => res.json())
      .catch((e) => console.log(e));
    navigate(`/lift/add`);
  };
  const cancelHandler = () => {
    navigate("/lift/view-all");
  };
  return (
    <div className={styles.single_lift}>
      <div className={styles.lift_info}>
        <div>LIFT: {name}</div>
        {primarySnippet ? <div style={{textAlign: 'start'}}>{primarySnippet}</div> : ""}
        {secondarySnippet ? <div style={{textAlign: 'start'}}>{secondarySnippet}</div> : ""}
        <div>{noteSnippet}</div>
        <div>CREATED BY: {whoCreated}</div>
      </div>
      <div className={styles.lift_buttons}>
        <button onClick={editHandler}>Edit</button>
        <button onClick={deleteHandler}>Delete</button>
        <button onClick={cancelHandler}>Cancel</button>
      </div>
    </div>
  );
};
export default ViewSingleLift;
