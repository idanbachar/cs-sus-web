import { Route, Routes } from "react-router-dom";
import App from "../App";

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
    </Routes>
  );
};

export default Routing;
