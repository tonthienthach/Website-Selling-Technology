import instance from "./axios";

const url = "api/message";
const messageApi = {
  getMessageByUser: (userId) =>
    instance.get(`${url}/getMessageByUser/${userId}`),
  getAllConversation: () => instance.get(`${url}/getAllConversation`),
};

export default messageApi;
