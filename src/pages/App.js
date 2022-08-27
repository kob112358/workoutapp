import styles from "./App.module.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddLift from "./AddLift";
import Login from "./Login";
import Homepage from "./Homepage";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import ViewSingleLift from "../components/ViewSingleLift";
import EditSingleLift from "./EditSingleLift";
import ViewAllLifts from "../components/ViewAllLifts";

function App() {
  const [user, setUser] = useState(null);
  const { setId, setName } = useContext(AuthContext);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            if (data.user.provider === "github") {
              setId("github" + data.user.id);
              setName(data.user.username);
            }
            if (data.user.provider === "google") {
              setId("google" + data.user.id);
              setName(data.user.displayName);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getUser();
  }, [setId, setName]);

  return (
    <div className={styles.App}>
      <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
            className={styles.listItem}
          ></Route>
          <Route
            path="/lift/add"
            element={user ? <AddLift /> : <Navigate to="/login" />}
          ></Route>
          <Route path="/lift/:id" element={<ViewSingleLift />} />
          <Route path="/lift/:id/edit" element={<EditSingleLift />} />
          <Route path="/lift/view-all" element={<ViewAllLifts />} />
        </Routes>
    </div>
  );
}

export default App;
