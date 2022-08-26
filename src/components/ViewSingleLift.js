import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
      <>Primary muscle: {primary.map((x) => `${x} `)}</>
    ) : (
      ""
    );
  const secondarySnippet =
    secondary && secondary.length > 0 ? (
      <>Secondary muscle: {secondary.map((x) => `${x} `)}</>
    ) : (
      ""
    );
  const noteSnippet = notes ? <>Notes: {notes}</> : "";
  const editHandler = () => {
    navigate(`/lift/${lift._id}/edit`)
  }
  const deleteHandler = async () => {
    await fetch(`/lift/${params.id}`, {method: 'DELETE'}).then(res => res.json()).catch(e => console.log(e));
    navigate(`/addlift`);
  }
  const cancelHandler = () => {
    navigate('/addlift');
  }
  return (
    <div>
      <ul>
        <li>Lift: {name}</li>
        {primarySnippet ? <li>{primarySnippet}</li> : ""}
        {secondarySnippet ? <li>{secondarySnippet}</li> : ""}
        <li>{noteSnippet}</li>
        <li>Created by: {whoCreated}</li>
      </ul>
      <button onClick={editHandler}>Edit</button>
      <button onClick={deleteHandler}>Delete</button>
      <button onClick={cancelHandler}>Cancel</button>
    </div>
  );
};
export default ViewSingleLift;
