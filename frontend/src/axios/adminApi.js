import instance from "./axios";

const url = "api/admin";
const adminApi = {
  getListAllOrder: () => instance.get(`${url}/order`),
  getListAllUser: () => instance.get(`${url}/user`),
  updateStatusOrderByID: (id) => instance.put(`${url}/order/update/${id}`),
};

export default adminApi;
