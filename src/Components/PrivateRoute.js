import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import Cookies from "js-cookie";

import AuthContext from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const {} = useContext(AuthContext);
  const location = useLocation();
  const url = new URLSearchParams();
  url.set("redirect", location.pathname + location.search);

  return Cookies.get('authorized') ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
        search: url.toString(),
      }}
    />
  );
};

export default PrivateRoute;