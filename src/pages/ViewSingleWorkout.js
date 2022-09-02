import React, {useEffect, useState} from 'react';
import Card from '../styles/Card';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewSingleWorkout = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [workout, setWorkout] = useState({});
    useEffect(() => {
        fetch(location.pathname).then(res => res.json()).then(data => setWorkout(data)).catch(e => console.log(e));
    }, [location.pathname]);
    const deleteWorkoutHandler = () => {
        fetch(location.pathname, {method: 'DELETE'}).then(res => res.json()).then(data => {navigate('/workout/view-all')}).catch(e => console.log(e));
    }
    const editWorkoutHandler = () => {

    }
    return (
        <Card>
          <div>Name: {workout.name}</div>
          <div>Creator: {workout.whoCreated}</div>
          <div>
            Tags:
            {workout.tags?.map((tag) => (
              <> {tag}</>
            ))}
          </div>
          <button onClick={editWorkoutHandler}>Edit</button>
          <button onClick={deleteWorkoutHandler}>Delete</button>
      </Card>
    );
};

export default ViewSingleWorkout;