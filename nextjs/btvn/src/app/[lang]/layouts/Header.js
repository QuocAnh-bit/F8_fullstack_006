"use client";
import Facebook from "../components/components-svg/Facebook";
import Github from "../components/components-svg/Github";
import Theme from "../components/Theme";
import { useRouter, usePathname } from "next/navigation";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
} from "@nextui-org/react";
import { useEffect } from "react";

export default function Header({ params }) {
  const router = useRouter();
  const pathname = usePathname();

  //   useEffect(() => {
  //     router.push(localStorage.getItem("lang"));
  //   }, []);

  return (
    <Navbar>
      <NavbarBrand className="flex gap-3 ">
        <p className="font-bold text-inherit text-3xl">Welcome To Me !</p>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex justify-evenly "
        justify="center"
      >
        <NavbarItem justify="end">
          <Link
            href="https://www.facebook.com/quocanh2001"
            aria-current="page"
            target="_blank"
          >
            <Facebook />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="https://github.com/QuocAnh-bit"
            target="_blank"
          >
            <Github />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Theme />
        </NavbarItem>
        <NavbarItem>
          <Button
            onClick={() => {
              router.push(params.lang !== "vi" ? "vi" : "en");
              localStorage.setItem("lang", params.lang !== "vi" ? "vi" : "en");
            }}
          >
            {pathname !== "/vi" ? "VI" : "EN"}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
