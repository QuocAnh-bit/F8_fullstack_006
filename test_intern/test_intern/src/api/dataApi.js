import { client } from "../client";
import { getCookie } from "../utils/cookie";

const dataApi = {
  getPosts: async (filter) => {
    try {
      const token = getCookie("accessToken");
      const queryString = new URLSearchParams(filter).toString();
      const { data } = await client.get(`/posts?${queryString}`, token);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getTags: async () => {
    try {
      const token = getCookie("accessToken");
      const { data } = await client.get(`/posts/tags`, token);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default dataApi;
