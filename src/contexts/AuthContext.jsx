import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/AuthConstant";
import {
  getMyInformation,
  logIn,
  logOut,
} from "../services/backend/AuthService";

export const AuthContext = createContext({
  userInfo: null,
  login: async () => {},
  logout: async () => {},
});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = async (phoneNumber, password) => {
    const { data } = await logIn(phoneNumber, password);
    if (data) {
      localStorage.setItem(ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
    }

    //fetch user info
    const { data: userInfoResponse } = await getMyInformation();
    setUserInfo(userInfoResponse);
  };

  const handleLogout = async () => {
    await logOut();
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUserInfo(null);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data } = await getMyInformation();
      setUserInfo(data);
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
    } else {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  return (
    <AuthContext.Provider
      value={{ userInfo, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
