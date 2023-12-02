"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function Blogs() {
  const { data: session } = useSession();

  if (session === null) {
    redirect("/auth");
  }
  return <div>Blog sau khi login</div>;
}
