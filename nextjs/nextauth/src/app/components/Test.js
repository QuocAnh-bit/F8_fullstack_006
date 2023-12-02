"use client";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

function Test() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <Button
          variant="shadow"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      <Button color="primary" onClick={() => signIn()}>
        Sign in
      </Button>
    </>
  );
}

export default Test;
