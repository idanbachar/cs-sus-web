import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import {
  CheckIsLoggedIn,
  GetLoggedInUserDataFromCookies,
} from "./services/loginService";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import "./App.css";
import Footer from "./components/Footer/Footer";

const App: React.FC<{ children: React.ReactNode }> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locatiuon = useLocation();

  const navigateToHomePage = () => {
    navigate(`/search`, {
      replace: true,
    });
  };

  useEffect(() => {
    const isLoggedIn = CheckIsLoggedIn();
    if (isLoggedIn) {
      const loggedInUserData = GetLoggedInUserDataFromCookies();
      if (loggedInUserData) {
        dispatch(setUser(loggedInUserData));
        if (locatiuon.pathname === "/login-succeed") navigateToHomePage();
      }
    }
  }, []);

  return (
    <div className="App">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default App;
