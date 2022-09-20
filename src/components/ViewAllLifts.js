import React from "react";
import Lift from "./Lift";
import { useEffect, useState } from "react";
import styles from "./ViewAllLifts.module.css";
import Card from '../styles/Card';
import { useNavigate } from "react-router-dom";

const ViewAllLifts = () => {
  const [allLifts, setAllLifts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getLifts = () => {
      fetch("/lift")
        .then((res) => res.json())
        .then((data) => {
          setAllLifts(data);
        });
    };
    getLifts();
  }, []);
  const addLift = () => {
    navigate('/lift/add');
  }
  return (
    <div>
      <h1>All lifts</h1>
      <Card><div onClick={addLift}>ADD NEW LIFT</div></Card>
      <div className={styles.all_lift_list}>
        {allLifts.length > 0
          ? allLifts.map((li) => <Lift lift={li} key={li._id} />)
          : "loading..."}
      </div>
    </div>
  );
};

export default ViewAllLifts;
