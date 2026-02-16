import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setEmployeeDetails, setEmployeeRole } from "../redux/slices/EmployeeSlice";

const RoleBasedRoute = ({ element: Element, allowedRoles, redirectPaths }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const location = useLocation();


  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role; // Extract directly from payload

    // 2. Sync Redux (Use useEffect to prevent side-effect warnings)
    useEffect(() => {
      dispatch(setEmployeeDetails(decodedToken));
      dispatch(setEmployeeRole(userRole));
    }, [decodedToken, userRole, dispatch]);

    // 3. Role Authorization
    if (!allowedRoles.includes(userRole)) {
      const redirectPath = redirectPaths[userRole] || "/";
      return <Navigate to={redirectPath} />;
    }

    return <Element />;
  } catch (error) {
    console.error("Invalid Token:", error);
    return <Navigate to="/login" />;
  }
};

export default RoleBasedRoute;