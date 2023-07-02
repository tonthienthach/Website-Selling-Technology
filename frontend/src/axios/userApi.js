import instance from "./axios";

const url = "api/user";
const userApi = {
  getInfoUser: () => instance.get(`${url}/info`),
  updateInfoUser: (body) => instance.put(`${url}/update`, body),
};

export default userApi;
