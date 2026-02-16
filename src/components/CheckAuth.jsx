import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmployeeDetails,
  setEmployeeAllData,
  setEmployeeRole,
} from "../redux/slices/EmployeeSlice";
import axios from "axios";

export const CheckAuth = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localStorageToken = localStorage.getItem("token");
        
        if (!localStorageToken) {
          navigate("/login");
          return;
        }

        const userdata = jwtDecode(localStorageToken);

        // 1. Unified Role Check (matches your backend roles)
        // Ensure "admin" is allowed to pass through here
        if (userdata.role !== "admin" && userdata.role !== "hr" && userdata.role !== "headHr") {
          alert("You are not authorized to access this section.");
          navigate("/login");
          return;
        }

        // 2. Fix the Property Mismatch
        // Your token is now { id, role }, NOT { userDetails: { role } }
        dispatch(setEmployeeDetails(userdata));
        dispatch(setEmployeeRole(userdata.role)); // FIXED: removed .userDetails

        // 3. Fetch Full Profile
        // Note: Using 'employee' endpoint since 'user' model is merged into Employee
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/employee/getEmployeeById/${userdata.id}`
        );
        
        const employeeData = res.data.data;
        dispatch(setEmployeeAllData(employeeData));

        if (employeeData.companyDetails) {
          localStorage.setItem("companyId", employeeData.companyDetails._id);
        }
        
      } catch (error) {
        console.error("Auth Verification Error:", error);
        navigate("/login");
      }
    };
    fetchData();
  }, [dispatch, navigate]);

  return children;
};

export default CheckAuth;