import instance from "./axios";

const url = "api/auth";
const authApi = {
  getUserByLoginGoogle: (id) =>
    instance.post(`${url}/login-success`, { userId: id }),
};

export default authApi;
