import instance from "./axios";

const url = "api/category";
const categoryApi = {
  getListCategory: () => instance.get(url),
  getCategoryByID: (id) => instance.get(`${url}/${id}`),
};

export default categoryApi;
