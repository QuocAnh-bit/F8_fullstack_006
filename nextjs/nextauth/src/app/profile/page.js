"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function Profile() {
  const { data: session } = useSession();

  if (session === null) {
    redirect("/auth");
  }
  return <div>Profile</div>;
}
