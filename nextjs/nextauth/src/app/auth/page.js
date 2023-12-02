"use client";

import { SERVER_API } from "../config/config";
import { signIn, signOut, useSession } from "next-auth/react";
import { Input, Button, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { EyeOpen } from "./svg/EyeOpen";
import { EyeClose } from "./svg/EyeClose";
import Link from "next/link";
import { data } from "autoprefixer";
import { redirect } from "next/navigation";

export default function Auth() {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(false);
  const [loading, isLoading] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({});
  const { data: session } = useSession();

  console.log(session);
  if (session !== null) {
    redirect("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postAuth(form);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const postAuth = async (data) => {
    const response = await fetch(
      `${SERVER_API}/auth/${status ? "register" : "login"}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const a = await response.json();
    if (response.ok) {
      setStatus(false);
      // var now = new Date();
      // now.setDate(now.getDate() + 1);
      // console.log(document.cookie);
      // document.cookie = `token="thistoken"; expires=${now.toUTCString()}`;
      // console.log(document.cookie);
    } else {
      setErr(response.status);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="flex justify-center items-center max-w-[1280px] h-screen mx-auto	 ">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-96 p-10 rounded-lg bg-[#001731] items-center "
      >
        {err}
        <h3>{status ? "Đăng Ký" : "Đăng Nhập"}</h3>
        {status ? (
          <Input
            classNames={"w-full"}
            type="name"
            label="Name"
            variant="bordered"
            placeholder="Enter your name"
            className="max-w-xs"
            required
            onChange={handleChange}
            name="name"
          />
        ) : (
          ""
        )}
        <Input
          type="email"
          label="Email"
          variant="bordered"
          placeholder="Enter your email"
          className="max-w-xs"
          onChange={handleChange}
          name="email"
        />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeOpen className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeClose className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
          onChange={handleChange}
          name="password"
        />
        <div className="flex w-full max-w-xs gap-3">
          {status ? (
            <>
              <Button color="primary" className="w-full  " type="submit">
                Đăng Ký
              </Button>
            </>
          ) : (
            <>
              <Button color="primary" className="w-full  " type="submit">
                Đăng Nhập
              </Button>
              <Button
                color="primary"
                className="w-full  "
                onClick={() => setStatus(true)}
              >
                Đăng Ký
              </Button>
            </>
          )}
        </div>
        <Button className="w-full max-w-xs" onClick={() => signIn()}>
          Đăng nhập mạng xã hội
        </Button>
      </form>
    </div>
  );
}
