import { useEffect } from "react";
import {
  CheckIsLoggedIn,
  GetLoggedInParamsFromUrl,
  GetLoggedInUserDataFromCookies,
} from "../../services/loginService";
import { CreateUser, IsUserExists } from "../../services/firebaseService";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const LoggedInPage: React.FC = () => {
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const navigateToHomePage = () => {
    navigate(`/`, {
      replace: true,
    });
  };

  useEffect(() => {
    (async () => {
      const isLoggedIn = CheckIsLoggedIn();
      if (!isLoggedIn) {
        const loggedInUserData = GetLoggedInParamsFromUrl(queryParameters);
        if (loggedInUserData) {
          const isUserExists = await IsUserExists(loggedInUserData.id);
          if (!isUserExists)
            await CreateUser({ ...loggedInUserData, trackingList: [] });
          navigateToHomePage();
        } else {
          navigateToHomePage();
        }
      } else {
        const loggedInUserData = GetLoggedInUserDataFromCookies();
        if (loggedInUserData) {
          dispatch(setUser(loggedInUserData));
          navigateToHomePage();
        }
      }
    })();
  }, [location]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <h1>You are now logged in.</h1>
    </div>
  );
};

export default LoggedInPage;
