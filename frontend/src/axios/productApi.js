import instance from "./axios";

const url = "api/product";
const productApi = {
  getListProduct: () => instance.get(url),
  getListProductTopRecommend: () => instance.get(`${url}/recommend/highscore`),
  getListProductByCate: (id) => instance.get(`${url}/cate/${id}`),
  getProductByID: (id) => instance.get(`${url}/${id}`),
  searchProductByName: (body) => instance.post(`${url}/search`, body),
};

export default productApi;
