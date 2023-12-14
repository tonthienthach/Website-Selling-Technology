import instance from "./axios";

const url = "api/message";
const messageApi = {
  getMessageByUser: (userId) =>
    instance.get(`${url}/getMessageByUser/${userId}`),
  getAllConversation: () => instance.get(`${url}/getAllConversation`),
  getConversationByUser: () => instance.get(`${url}/getConversationByUser`),
  updateLastSeen: (body) => instance.put(`${url}/updateLastSeen`, body),
};

export default messageApi;
