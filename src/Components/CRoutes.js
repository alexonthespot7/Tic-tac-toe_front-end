import { Routes, Route, Navigate } from "react-router-dom";

import TTTMain from "./TTTMain";
import Registration from "./Registration";
import Login from "./Login";
import Statistics from "./Statistics";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";

function CRoutes() {
  return(
    <Routes>
      <Route path="/" element={<TTTMain />} />      
      <Route
        path="/registration"
        element={
          <GuestRoute>  
            <Registration />
          </GuestRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/statistics"
        element={
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default CRoutes;