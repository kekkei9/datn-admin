import { axiosClient } from "../axiosClient";

export const deactivateUser = (userId, deactivated) =>
  axiosClient.post("/users/deactivate/" + userId, {
    deactivated,
  });

export const deleteUser = (userId) => axiosClient.delete("/users/" + userId);

export const responseDoctorRequest = (doctorRequestId, accept) =>
  axiosClient.post("/users/doctor-register/response/" + doctorRequestId, {
    accept,
  });
