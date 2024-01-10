import { getSession } from "@auth0/nextjs-auth0";

import ListMap from "./ListMap";
import { redirect } from "next/navigation";

export default async function page() {
  return (
    <>
      <ListMap />
    </>
  );
}
