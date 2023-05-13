import instance from "./axios";

const url = "api/order";
const orderApi = {
  getListAllOrder: () => instance.get(`${url}`),
  getListOrderByStatus: (status) => instance.get(`${url}/${status}`),
  cancelOrder: (id) => instance.put(`${url}/cancel/${id}`),
  updateStatusPaid: (body) => instance.put(`${url}/updatePaid`, body),
};

export default orderApi;
