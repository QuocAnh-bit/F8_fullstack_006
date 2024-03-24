import { client } from "../client";
import { setCookie } from "../utils/cookie";
const authApi = {
  postLogin: async (body) => {
    try {
      const { data } = await client.post(`/auth/login`, body);
      if (data?.code === 401) {
        throw Error("Tên người dùng không tồn tại");
      }
      setCookie("accessToken", data.accessToken, 1);
      setCookie("refreshToken", data.refreshToken, 10);
      return data;
    } catch (error) {
      return false;
    }
  },

  // refreshToken: async () => {
  //   const refreshToken = getCookie("refreshToken");
  //   const { data } = await client.post(`/auth/refreshToken`, { refreshToken });
  // },
};

export default authApi;
