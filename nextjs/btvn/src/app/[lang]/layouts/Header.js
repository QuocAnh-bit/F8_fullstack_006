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
  Tooltip,
} from "@nextui-org/react";
import { useEffect } from "react";

export default function Header({ params }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem("lang") !== null) {
      router.push(localStorage.getItem("lang"));
    }
  }, []);

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
          <Tooltip
            placement={"bottom"}
            content={"https://www.facebook.com/quocanh2001"}
            color="secondary"
          >
            <Link
              href="https://www.facebook.com/quocanh2001"
              aria-current="page"
              target="_blank"
            >
              <Facebook />
            </Link>
          </Tooltip>
        </NavbarItem>
        <NavbarItem>
          <Tooltip
            placement={"bottom"}
            content={"https://github.com/QuocAnh-bit"}
            color="secondary"
          >
            <Link
              color="foreground"
              href="https://github.com/QuocAnh-bit"
              target="_blank"
            >
              <Github />
            </Link>
          </Tooltip>
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
