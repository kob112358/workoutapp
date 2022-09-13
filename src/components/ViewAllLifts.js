import React from "react";
import Lift from "./Lift";
import { useEffect, useState } from "react";
import styles from './ViewAllLifts.module.css';

const ViewAllLifts = () => {
  const [allLifts, setAllLifts] = useState([]);
  useEffect(() => {
    const getLifts = () => {
      fetch("/lift").then(res => res.json()).then(data => {setAllLifts(data)});
    };
    getLifts();
  }, []);
  return (
    <div><h1>All lifts</h1><div className={styles.all_lift_list}>{allLifts.length > 0 ? allLifts.map((li) => <Lift lift={li} key={li._id}/>) : "loading..."}</div></div>
  );
};

export default ViewAllLifts;
