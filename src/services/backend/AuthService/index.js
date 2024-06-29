import { axiosClient } from "../axiosClient";

export const logIn = (phoneNumber, password) => {
  return axiosClient.post("/auth/login", { phoneNumber, password });
};

export const logOut = () => {
  return axiosClient.get("/auth/logout");
};

export const getMyInformation = () => {
  return axiosClient.get("/auth/me");
};

export const forgotPassword = (phoneNumber) => {
  return axiosClient.post("/auth/forgot-password", { phoneNumber });
};

export const resetPassword = (token, newPassword) => {
  return axiosClient.post("/auth/reset-password", {
    token,
    newPassword,
  });
};
