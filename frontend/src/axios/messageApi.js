import instance from "./axios";

const url = "api/message";
const messageApi = {
  getMessageByUser: () => instance.get(`${url}/getMessageByUser`),
};

export default messageApi;
