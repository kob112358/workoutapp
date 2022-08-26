import React from "react";
import { useRef, useState } from "react";
import ViewAllLifts from "../components/ViewAllLifts";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { MUSCLE_GROUPS } from "../variables/muscles";
import styles from "./AddLift.module.css";
import { useNavigate } from 'react-router-dom'

function AddLift() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const nameRef = useRef(null);
  const videoRef = useRef(null);
  const notesRef = useRef(null);
  const [primary, setPrimary] = useState(new Array(MUSCLE_GROUPS.length).fill(false));
  const [secondary, setSecondary] = useState(new Array(MUSCLE_GROUPS.length).fill(false));

  const onAddLift = (name, video, notes) => {
    const primaryMusclesToAdd = MUSCLE_GROUPS.filter((muscle, index) => primary[index] === true);
    const secondaryMusclesToAdd = MUSCLE_GROUPS.filter((muscle, index) => secondary[index] === true);
    const liftToAdd = { name: name, video: video, notes: notes, creator: auth.name, primary: primaryMusclesToAdd, secondary: secondaryMusclesToAdd };
    fetch("http://localhost:5000/lift", {
      body: JSON.stringify(liftToAdd),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data && data.redirect) {
          navigate(data.redirect);
        }
      })
      .catch((e) => {
        alert(`issue adding ${nameRef}`);
        console.log(e);
      });
  };
  const addPrimaryHandler = (e, index) => {
    setPrimary((prevState) => {
      const newState = [...prevState];
      newState[index] = e.target.checked;
      return newState;
    })
  };
  const addSecondaryHandler = (e, index) => {
    setSecondary((prevState) => {
      const newState = [...prevState];
      newState[index] = e.target.checked;
      return newState;
    })
  };

  const addLiftHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const video = videoRef.current.value;
    const notes = notesRef.current.value;
    onAddLift(name, video, notes);
  };
  return (
    <>
      <form onSubmit={addLiftHandler}>
        <label htmlFor="name" key={'1234'}>Name</label>
        <input
          ref={nameRef}
          key={'12345'}
          type="text"
          id="name"
          placeholder="i.e. Bench Press"
        />
        <label htmlFor="video">Video</label>
        <input
          ref={videoRef}
          type="text"
          id="video"
          placeholder="Youtube URL"
        />
        <label htmlFor="notes">Notes</label>
        <input
          ref={notesRef}
          type="text"
          id="notes"
          placeholder="i.e. keep elbows in"
        />
        <div className={styles.muscles}>Primary muscles:
        {MUSCLE_GROUPS.map((muscle, index) => {
          return (
            <div className={styles.muscle_groups} key={index}>
              <label htmlFor={muscle}>
                {muscle}
              </label>
              <input id={muscle} type="checkbox" value={muscle} name={muscle} onChange={(e) => {addPrimaryHandler(e, index)}}></input>
            </div>
          );
        })}
        </div>
        <div className={styles.muscles}>Secondary muscles: 
        {MUSCLE_GROUPS.map((muscle, index) => {
          return (
            <div className={styles.muscle_groups} key={index}>
              <label htmlFor={muscle + 'secondary'} id={muscle} >
                {muscle}
              </label>
              <input id={muscle + 'secondary'} type="checkbox" value={muscle} name={muscle} onChange={(e) => {addSecondaryHandler(e, index)}}></input>
            </div>
          );
        })}
        </div>
        <button>Save lift</button>
      </form>
      <ViewAllLifts />
    </>
  );
}

export default AddLift;
