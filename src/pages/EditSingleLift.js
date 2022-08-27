import React from "react";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { MUSCLE_GROUPS } from "../variables/muscles";
import { useNavigate } from "react-router-dom";
import styles from "./EditSingleLift.module.css";
import Card from "../styles/Card.js";

function EditSingleLift() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const nameRef = useRef(null);
  const videoRef = useRef(null);
  const notesRef = useRef(null);
  const [lift, setLift] = useState("");
  const [primary, setPrimary] = useState(new Array(11).fill(false));
  const [secondary, setSecondary] = useState(new Array(11).fill(false));

  const params = useParams();
  useEffect(() => {
    const getLift = () => {
      fetch(`/lift/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setLift(data);
          setPrimary(
            MUSCLE_GROUPS.map((muscle) => data.primary.includes(muscle))
          );
          setSecondary(
            MUSCLE_GROUPS.map((muscle) => data.secondary.includes(muscle))
          );
        })
        .catch((e) => console.log(e));
    };
    getLift();
  }, [params]);
  const onEditLift = (name, video, notes) => {
    const primaryToAdd = MUSCLE_GROUPS.filter(
      (muscle, index) => primary[index]
    );
    const secondaryToAdd = MUSCLE_GROUPS.filter(
      (muscle, index) => secondary[index]
    );
    const liftToEdit = {
      name: name,
      video: video,
      notes: notes,
      creator: auth.name,
      id: lift._id,
      primary: primaryToAdd,
      secondary: secondaryToAdd,
    };
    fetch(`http://localhost:5000/lift/${params.id}`, {
      body: JSON.stringify(liftToEdit),
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate(`/lift/${lift._id}`);
        }
      })
      .catch((e) => {
        alert(`issue editing ${nameRef}`);
        console.log(e);
      });
  };
  const cancelHandler = () => {
    navigate(`/lift/view-all`);
  };

  const editLiftHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const video = videoRef.current.value;
    const notes = notesRef.current.value;
    onEditLift(name, video, notes);
  };

  const primaryHandler = (e, index) => {
    setPrimary((prevState) => {
      let newState = [...prevState];
      newState[index] = e.target.checked;
      return newState;
    });
  };
  const secondaryHandler = (e, index) => {
    setSecondary((prevState) => {
      let newState = [...prevState];
      newState[index] = e.target.checked;
      return newState;
    });
  };

  return (
    <Card>
      <form onSubmit={editLiftHandler} className={styles.add_form}>
        Please edit lift id: {lift._id}
        <div>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" id="name" defaultValue={lift.name} />
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
          <label htmlFor="notes">Notes</label>
          <input
            ref={notesRef}
            type="text"
            id="notes"
            defaultValue={lift.notes}
          />
        </div>
        <div className={styles.muscle_groups}>
          <div className={styles.muscles}>
            Primary muscles:
            {MUSCLE_GROUPS.map((muscle, index) => {
              return (
                <div className={styles.muscle_groups} key={index}>
                  <input
                    id={muscle}
                    type="checkbox"
                    value={muscle}
                    name={muscle}
                    defaultChecked={lift.primary?.includes(muscle)}
                    onClick={(e) => {
                      primaryHandler(e, index);
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
                <div className={styles.muscle_groups} key={index}>
                  <input
                    id={muscle + "secondary"}
                    type="checkbox"
                    value={muscle}
                    name={muscle}
                    defaultChecked={lift.secondary?.includes(muscle)}
                    onClick={(e) => {
                      secondaryHandler(e, index);
                    }}
                  ></input>
                  <label htmlFor={muscle + "secondary"}>{muscle}</label>
                </div>
              );
            })}
          </div>
        </div>
        <button onClick={editLiftHandler}>Save lift</button>
        <button onClick={cancelHandler}>Cancel</button>
      </form>
    </Card>
  );
}

export default EditSingleLift;
