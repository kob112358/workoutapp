import React from "react";
import { useRef, useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { MUSCLE_GROUPS } from "../variables/muscles";
import styles from "./AddLift.module.css";
import { useNavigate } from "react-router-dom";
import Card from "../styles/Card";

function AddLift() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const nameRef = useRef(null);
  const isTimedRef = useRef(false);
  const videoRef = useRef(null);
  const notesRef = useRef(null);
  const [primary, setPrimary] = useState(
    new Array(MUSCLE_GROUPS.length).fill(false)
  );
  const [secondary, setSecondary] = useState(
    new Array(MUSCLE_GROUPS.length).fill(false)
  );

  const onAddLift = (name, video, notes, isTimed) => {
    const primaryMusclesToAdd = MUSCLE_GROUPS.filter(
      (muscle, index) => primary[index] === true
    );
    const secondaryMusclesToAdd = MUSCLE_GROUPS.filter(
      (muscle, index) => secondary[index] === true
    );
    const liftToAdd = {
      name: name,
      video: video,
      isTimed: isTimed,
      notes: notes,
      creator: auth.name,
      primary: primaryMusclesToAdd,
      secondary: secondaryMusclesToAdd,
    };
    fetch("http://localhost:5000/lift", {
      body: JSON.stringify(liftToAdd),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.redirect) {
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
    });
  };
  const addSecondaryHandler = (e, index) => {
    setSecondary((prevState) => {
      const newState = [...prevState];
      newState[index] = e.target.checked;
      return newState;
    });
  };

  const addLiftHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const video = videoRef.current.value;
    const notes = notesRef.current.value;
    const isTimed = isTimedRef.current.checked;
    onAddLift(name, video, notes, isTimed);
  };

  const cancelHandler = () => {
    navigate("/");
  };
  return (
    <Card>
      <form onSubmit={addLiftHandler} className={styles.add_form}>
        <div>
          <label htmlFor="name" key={"1234"}>
            Name
          </label>
          <input
            ref={nameRef}
            key={"12345"}
            type="text"
            id="name"
            placeholder="i.e. Bench Press"
            required
          />
        </div>
        <div>
          <label htmlFor="video">Video</label>
          <input
            ref={videoRef}
            type="text"
            id="video"
            placeholder="Youtube URL"
          />
        </div>
        <div>
          <label htmlFor="isTimed">Timed</label>
          <input
            ref={isTimedRef}
            type="checkbox"
            id="isTimed"
            defaultChecked="false"
          />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <input
            ref={notesRef}
            type="text"
            id="notes"
            placeholder="i.e. keep elbows in"
          />
        </div>
        <div className={styles.muscle_groups}>
          <div className={styles.muscles}>
            Primary muscles:
            {MUSCLE_GROUPS.map((muscle, index) => {
              return (
                <div key={index}>
                  <input
                    id={muscle}
                    type="checkbox"
                    value={muscle}
                    name={muscle}
                    onChange={(e) => {
                      addPrimaryHandler(e, index);
                    }}
                  ></input>
                  <label htmlFor={muscle}>{muscle}</label>
                </div>
              );
            })}
          </div>
          <div className={styles.muscles}>
            Secondary muscles:
            {MUSCLE_GROUPS.map((muscle, index) => {
              return (
                <div key={index}>
                  <input
                    id={muscle + "secondary"}
                    type="checkbox"
                    value={muscle}
                    name={muscle}
                    onChange={(e) => {
                      addSecondaryHandler(e, index);
                    }}
                  ></input>
                  <label htmlFor={muscle + "secondary"} id={muscle}>
                    {muscle}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.addlift_buttons}>
          <button>Save lift</button>
          <button onClick={cancelHandler}>Cancel</button>
        </div>
      </form>
    </Card>
  );
}

export default AddLift;
