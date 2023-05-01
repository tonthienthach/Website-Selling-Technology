import instance from "./axios";

const url = "api/brand";
const productApi = {
  getListBrandByCate: (id) => instance.get(`${url}/${id}`),
};

export default productApi;
