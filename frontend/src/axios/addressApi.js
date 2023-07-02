import instance from "./axios";

const url = "api/address";
const addressApi = {
  deleteAddress: (id) => instance.delete(`${url}/delUserAddress/${id}`),
};

export default addressApi;
