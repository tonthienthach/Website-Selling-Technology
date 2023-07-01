import instance from "./axios";

const url = "api/brand";
const brandApi = {
  getListBrandByCate: (id) => instance.get(`${url}/${id}`),
};

export default brandApi;
