import instance from "./axios";

const url = "api/order";
const orderApi = {
  getListOrderByStatus: (status) => instance.get(`${url}/${status}`),
};

export default orderApi;
