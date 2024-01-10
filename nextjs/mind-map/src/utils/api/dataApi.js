import { client } from "./client";
import { getLocalStorage, setLocalStorage } from "../localStorage";
import config from "@/config/config";

const { SERVER_API } = config;

export const getListMindMap = async (a) => {
  const { data } = await client.get(`/mind-map`);

  const filterDataUser = data.filter((item) => item.userID === a);

  setLocalStorage("datas", filterDataUser);
  return filterDataUser;
};

export const getMindMap = async (id) => {
  try {
    const response = await fetch(`${SERVER_API}/mind-map/${id}`, {
      cache: "no-cache",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("API không tìm thấy");
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postListMindMap = async (body) => {
  try {
    const { data } = await client.post(`/mind-map`, body);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMindMap = async (id) => {
  try {
    const { data } = await client.delete(`/mind-map/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateMindMap = async (id, body) => {
  try {
    const { data } = await client.patch(`/mind-map/${id}`, body);
  } catch (error) {
    console.log(error);
  }
};
