import React from "react";
import MindMap from "../MindMap";
import { notFound, redirect } from "next/navigation";
import { getMindMap } from "@/utils/api/dataApi";

export const generateMetadata = async ({ params }) => {
  const data = await getMindMap(params.id);

  if (data) {
    return {
      title: data.mode != "private" ? data.mode.titleShare : "Chưa có tiêu đề",
      description: data.mode != "private" ? data.mode.descShare : "Mind Map",
      openGraph: {
        title: data.mode != "private" ? data.mode.titleShare : "Mind Map",
        description: data.mode != "private" ? data.mode.descShare : "Mind Map",
        images: [data.mode != "private" ? data.mode.imgShare : "Mind Map"],
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
