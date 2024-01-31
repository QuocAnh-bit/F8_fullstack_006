import { client } from "./client";

export const getProfile = async () => {
  try {
    const { data } = await client.get(`/profile`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const { data } = await client.get(`/users`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetail = async (id) => {
  try {
    const { data } = await client.get(`/users/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
