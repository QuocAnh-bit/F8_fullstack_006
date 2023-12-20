import React from "react";
import MindMap from "../MindMap";
import { notFound, redirect } from "next/navigation";
export const generateMetadata = async ({ params }) => {
  const getMindMap = async (id) => {
    try {
      const response = await fetch(
        `https://n3pjg6-8080.csb.app/mind-map/${id}`,
        {
          cache: "no-cache",
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("API không tìm thấy");
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      notFound();
    }
  };
  const data = await getMindMap(params.id);
  console.log(data);
  if (data) {
    return {
      title: data.mode ? data.mode.titleShare : "Mind Map",
      description: data.mode ? data.mode.descShare : "Mind Map",
      openGraph: {
        title: data.mode ? data.mode.titleShare : "Mind Map",
        description: data.mode ? data.mode.descShare : "Mind Map",
        images: [data.mode ? data.mode.imgShare : "Mind Map"],
      },
    };
  }
};

export default async function page({ params }) {
  return (
    <>
      <MindMap />
    </>
  );
}
