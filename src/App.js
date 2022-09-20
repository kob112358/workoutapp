import styles from "./App.module.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddLift from "./pages/AddLift";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import { useEffect, useContext, useState } from "react";
import AuthContext from "./store/AuthContext";
import ViewSingleLift from "./components/ViewSingleLift";
import EditSingleLift from "./pages/EditSingleLift";
import ViewAllLifts from "./components/ViewAllLifts";
import AddWorkout from "./pages/AddWorkout";
import ErrorPage from "./pages/ErrorPage";
import ViewAllWorkouts from "./pages/ViewAllWorkouts";
import ViewSingleWorkout from "./pages/ViewSingleWorkout";
import EditSingleWorkout from "./pages/EditSingleWorkout";
import ViewAllRoutes from "./pages/ViewAllRoutines";
import EditSingleRoutine from "./pages/EditSingleRoutine";
import ViewSingleRoutine from './pages/ViewSingleRoutine.js';
import AddRoutine from "./pages/AddRoutine";

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
          <Route path="/lift/view-all" element={<ViewAllLifts />} />
          <Route path="/lift/:id" element={<ViewSingleLift />} />
          <Route path="/lift/:id/edit" element={<EditSingleLift />} />
          <Route path="/routine/view-all" element={<ViewAllRoutes />} />
          <Route path="/routine/add" element={<AddRoutine />} />
          <Route path="/routine/:id" element={<ViewSingleRoutine />} />
          <Route path="/routine/:id/edit" element={<EditSingleRoutine />} />
          <Route path="/workout/add" element={<AddWorkout />} />
          <Route path="/workout/view-all" element={<ViewAllWorkouts />} />
          <Route path="/workout/:id" element={<ViewSingleWorkout />} />
          <Route path="/workout/:id/edit" element={<EditSingleWorkout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </div>
  );
}

export default App;
