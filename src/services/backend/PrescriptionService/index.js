import { axiosClient } from "../axiosClient";

export const deletePrescription = (prescriptionId) =>
  axiosClient.delete("/prescriptions/" + prescriptionId);
