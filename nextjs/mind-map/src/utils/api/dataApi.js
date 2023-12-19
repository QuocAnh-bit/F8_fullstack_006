import { client } from "./client";
import { getLocalStorage, setLocalStorage } from "../localStorage";
import config from "@/config/config";

const { SERVER_API } = config;

export const getListMindMap = async () => {
  const { data } = await client.get(`/mind-map`);
  setLocalStorage("datas", data);
  return data;
};

export const getMindMap = async (id) => {
  const response = await fetch(`${SERVER_API}/mind-map/${id}`, {
    cache: "no-cache",
  });
  const data = await response.json();

  return data;
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
