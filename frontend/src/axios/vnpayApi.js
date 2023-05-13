import instance from "./axios";

const url = "api/payment";
const vnpayApi = {
  createPaymentByVNPay: (body) => instance.post(`${url}/vnpay-payment`, body),
};

export default vnpayApi;
