import instance from "./axios";

const url = "api/voucher";
const voucherApi = {
  getVoucherActive: () => instance.get(url),
  getAllVoucher: () => instance.get(`${url}/all`),
  createVoucher: (body) => instance.post(`${url}/create`, body),
  deleteVoucher: (voucherId) =>
    instance.put(`${url}/changeStatus/${voucherId}`),
};

export default voucherApi;
