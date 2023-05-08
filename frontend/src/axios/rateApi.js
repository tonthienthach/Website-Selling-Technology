import instance from "./axios";

const url = "api/rate";
const rateApi = {
  getAllRating: (id) => instance.get(`${url}/${id}`),
  addRateByUser: (body) => instance.post(`${url}/create`, body),
};

export default rateApi;
