import instance from "./axios";

const url = "api/user";
const userApi = {
  getInfoUser: () => instance.get(`${url}/info`),
  changePassword: (body) => instance.put(`${url}/changepassword`, body),
  forgotPassword: (body) => instance.post(`${url}/forget-password`, body),
  updateInfoUser: (body) => instance.put(`${url}/update`, body),
  saveVoucher: (id) => instance.get(`${url}/collectvoucher/${id}`),
};

export default userApi;
