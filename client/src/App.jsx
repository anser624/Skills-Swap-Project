import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import Body from "./components/Body/Body";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { info } from "./ReduxStore/features/userSlice";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
// import Skillsform from "./components/SkillsForm/Skillsform";
import About from "./components/About/About";
import HomePage from "./components/HomePage/HomePage";
import AllUserPage from "./components/AllUserPage/AllUserPage";
// import axios from "axios";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user) || {};

  useEffect(() => {
    try {
      if (!user?.email) {
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
          dispatch(info(JSON.parse(storedUser)));
        }
      }
    } catch (error) {
      Navigate('/login')
      console.log("Error " + error.code);
    } finally {
      setLoading(false); // chahe data mile ya na mile, loading khatam ho jaye
    }
  }, []);

  if (loading) {
    return (
      <div className="text-5xl text-center flex justify-center items-center h-screen font-bold animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="" element={<Body />}>
          <Route
          index
            path="/"
            element={user?.email ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="profile"
            element={user?.email ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="about"
            element={user?.email ? <About /> : <Navigate to="/login" />}
          />
          <Route
            path="/allUserPage"
            element={user?.email ? <AllUserPage /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={!user?.email ? <Login /> : <Navigate to="/profile" />}
          />
          <Route
            path="signup"
            element={!user?.email ? <SignUp /> : <Navigate to="/profile" />}
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
