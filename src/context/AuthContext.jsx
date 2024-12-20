import { useState, useEffect, createContext } from "react";
import { VerifySession } from "../services/VerifySession";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from 'prop-types';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    try {
      console.log("authUser");

      const sessionValid = await VerifySession();

      if (!sessionValid) {
        setLoading(false);
        navigate("/login");
        return;
      }

      const token = JSON.parse(localStorage.getItem("token"));
      const user = localStorage.getItem("user");

      if (!token && !user) {
        setLoading(false);
        return false;
      } else if (token) {

        const userObject = jwtDecode(token);
        userObject.firstname = userObject.first_name;
        userObject.lastname = userObject.last_name;
        userObject.role = userObject.role === "" ? JSON.parse(user).role : userObject.role;
        if (userObject.exp < Date.now() / 1000) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return;
        }
       // console.log(userObject);
        setAuth(userObject);
      } else {
        const userObject = JSON.parse(user);
        console.log(userObject);
        setAuth(userObject);

      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, authUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};