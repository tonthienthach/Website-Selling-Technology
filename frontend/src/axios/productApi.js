import instance from "./axios";

const url = "api/product";
const productApi = {
  getListProduct: () => instance.get(url),
  getListProductByCate: (id) => instance.get(`${url}/cate/${id}`),
  getProductByID: (id) => instance.get(`${url}/${id}`),
};

export default productApi;
