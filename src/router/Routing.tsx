import { Route, Routes } from "react-router-dom";
import App from "../App";
import LoggedInPage from "../pages/LoggedInPage/LoggedInPage";
import TrackListPage from "../pages/TrackListPage/TrackListPage";
import Search from "../components/Search/Search";
import SearchUserPage from "../pages/SearchUserPage/SearchUserPage";

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/search" element={<SearchUserPage />}></Route>
      <Route path="/login-succeed" element={<LoggedInPage />}></Route>
      <Route path="/mytracklist" element={<TrackListPage />}></Route>
    </Routes>
  );
};

export default Routing;
