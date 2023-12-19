import React from "react";
import MindMap from "../MindMap";
import { getMindMap } from "@/utils/api/dataApi";

export const generateMetadata = async ({ params }) => {
  const data = await getMindMap(params.id);
  console.log(data.name);
  return {
    title: data.mode ? data.mode.titleShare : "Mind Map",
    description: data.mode ? data.mode.descShare : "Mind Map",
    openGraph: {
      title: data.mode ? data.mode.titleShare : "Mind Map",
      description: data.mode ? data.mode.descShare : "Mind Map",
      images: [data.mode ? data.mode.imgShare : "Mind Map"],
    },
  };
};

export default function page({ params }) {
  return (
    <>
      <MindMap />
    </>
  );
}
