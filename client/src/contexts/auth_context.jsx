import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
  logoutRequest,
} from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateImageUser = (image) => {
    setUser({ ...user, image: image });
  }

  useEffect(() => {
    if (errors && errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const deleteErrorIndex = (index) => {
    setErrors(errors.filter((_error, i) => i !== index));
  };

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.log("error register context", error);
      setErrors(error.response.data.errors);
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const signin = async (credentials) => {
    try {
      const res = await loginRequest(credentials);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.log("error auth context", error);
      setErrors(error.response.data.errors);
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setErrors(error.response.data.errors);
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const logout = async () => {
    // Cokiees.remove("token");
    try {
      await logoutRequest();
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        errors,
        loading,
        signin,
        signup,
        deleteErrorIndex,
        logout,
        updateImageUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
