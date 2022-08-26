import React from "react";
import Lift from "./Lift";
import { useEffect, useState } from "react";

const ViewAllLifts = () => {
  const [allLifts, setAllLifts] = useState([]);
  useEffect(() => {
    const getLifts = () => {
      fetch("/lift").then(res => res.json()).then(data => {setAllLifts(data)});
    };
    getLifts();
  }, []);
  return (
    <ol>{allLifts.length > 0 ? allLifts.map((li) => <Lift lift={li} key={li._id}/>) : "loading..."}</ol>
  );
};

export default ViewAllLifts;
