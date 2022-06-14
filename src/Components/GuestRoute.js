import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";

function GuestRoute({ children }) {
  const { authorized } = useContext(AuthContext);
  const location = useLocation();
  const url = new URLSearchParams(location.search.slice(1));

  return authorized ? <Navigate to={url.get("redirect") || "/"} /> : children;
}

export default GuestRoute;