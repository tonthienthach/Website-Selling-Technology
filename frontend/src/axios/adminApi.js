import instance from "./axios";

const url = "api/admin";
const adminApi = {
  getListAllOrder: () => instance.get(`${url}/order`),
  getListAllUser: () => instance.get(`${url}/user`),
  updateStatusOrderByID: (id) => instance.put(`${url}/order/update/${id}`),
  getRevenueSale: (body) => instance.post(`${url}/dashboard/revenuesale`, body),
  getListOrderByStatus: (body) => instance.get(`${url}/order/${body.status}`),
  getStats: (body) => instance.post(`${url}/dashboard/stats`, body),
  getRevenueByCate: (body) =>
    instance.post(`${url}/dashboard/revenueByCate`, body),
};

export default adminApi;
