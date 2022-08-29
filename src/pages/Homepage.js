import React from 'react';
import {Link} from 'react-router-dom'
import styles from './Homepage.module.css';

const Homepage = () => {
    const addWorkout = () => {
        fetch('/workout/add', {method: 'POST'}).then(res => res.json()).then(data => console.log(data)).catch(e => console.log(e));
    }
    return (
        <div className={styles.routes}>
            <Link className={styles.link} to="/lift/view-all">View All Lifts</Link>
            <Link className={styles.link} to="/lift/add">Add Lift</Link>
            <Link className={styles.link} to="/lift/add">Log workout</Link> 
            <Link className={styles.link} to="/lift/add">View workouts</Link>
            <Link className={styles.link} to="/workout/add">Create workout</Link>
            <div className={styles.link} onClick={addWorkout}>Add workout test</div>
        </div>
    );
};

export default Homepage;