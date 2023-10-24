import instance from "./axios";

const url = "api/voucher";
const voucherApi = {
  getVoucherActive: () => instance.get(url),
  getAllVoucher: () => instance.get(`${url}/all`),
};

export default voucherApi;
