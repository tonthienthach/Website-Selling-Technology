import instance from "./axios";

const url = "api/order";
const orderApi = {
  getListAllOrder: () => instance.get(`${url}`),
  getListOrderByStatus: (status) => instance.get(`${url}/${status}`),
  cancelOrder: (id) => instance.put(`${url}/cancel/${id}`),
};

export default orderApi;
