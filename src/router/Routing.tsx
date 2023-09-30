import { Route, Routes } from "react-router-dom";
import LoggedInPage from "../pages/LoggedInPage/LoggedInPage";
import TrackingListPage from "../pages/TrackingListPage/TrackingListPage";
import SearchUserPage from "../pages/SearchUserPage/SearchUserPage";
import HomePage from "../pages/HomePage/HomePage";

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/search" element={<SearchUserPage />}></Route>
      <Route path="/login-succeed" element={<LoggedInPage />}></Route>
      <Route path="/myTrackingList" element={<TrackingListPage />}></Route>
    </Routes>
  );
};

export default Routing;
