import { getSession } from "@auth0/nextjs-auth0";

import ListMap from "./ListMap";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getSession();
  console.log(!user);
  if (user === null) {
    redirect("/");
  }
  return (
    <>
      <ListMap />
    </>
  );
}
