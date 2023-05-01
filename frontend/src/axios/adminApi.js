import instance from "./axios";

const url = "api/admin";
const orderApi = {
  getListAllOrder: () => instance.get(`${url}/order`),
  getListAllUser: () => instance.get(`${url}/user`),
};

export default orderApi;
