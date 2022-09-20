import React from 'react';
import styles from './AddRoutine.module.css';
import {useRef, useContext} from 'react';
import AuthContext from '../store/AuthContext';
import {useNavigate} from 'react-router-dom';
import Card from '../styles/Card';

const AddRoutine = () => {
    const routineName = useRef();
    const routineNotes = useRef();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
  
    const saveRoutine = (e) => {
      e.preventDefault();
      const routineNameToSave = routineName.current.value;
      const routineNotesToSave = routineNotes.current.value;
      const bodyData = JSON.stringify({
        routineName: routineNameToSave,
        notes: routineNotesToSave
      });
      fetch("/routine/", {
        body: bodyData,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?._id) {
            navigate(`/routine/${data._id}`);
          }
        })
        .catch((e) => console.log(e));
    };
  
    const cancelHandler = () => {
      navigate("/");
    };
  
    return auth.name.length > 0 ? (
      <Card>
        <form className={styles.add_routine__form} onSubmit={saveRoutine}>
          <div>
          <label htmlFor="routineName">Name:</label>
          <input
            id="routineName"
            type="text"
            placeholder="routine name.."
            ref={routineName}
            required
          ></input>
          </div>
          <div>
          <label htmlFor="notes">Notes:</label>
          <input
            type="textarea"
            id="notes"
            placeholder="add notes.."
            ref={routineNotes}
          ></input>
          </div>
          <div>
          </div>
          <div className={styles.add_routine__buttons}>
            <button type="submit">Save routine</button>
            <button onClick={cancelHandler}>Cancel</button>
          </div>
        </form>
      </Card>
    ) : (
      <>Please log in</>
    );
  };
export default AddRoutine;