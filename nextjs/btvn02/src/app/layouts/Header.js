"use client";

import { usePathname } from "next/navigation";
import Theme from "../components/Theme";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Button,
  Avatar,
  Tooltip,
} from "@nextui-org/react";

export default function Header() {
  const pathName = usePathname();
  return (
    <Navbar maxWidth="xl" className="fix">
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand className="mr-10 text-2xl font-mono">
          <p className="font-bold text-inherit">JunnX</p>
        </NavbarBrand>
        <NavbarItem className={pathName === "/" && "text-indigo-500 font-bold"}>
          <Link href="/">Trang Chủ</Link>
        </NavbarItem>
        <NavbarItem
          className={pathName === "/packages" && "text-indigo-500 font-bold"}
        >
          <Link href="/packages" aria-current="page">
            {" "}
            Ưu đãi
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Button as={Link} color="primary" href="#" variant="flat">
          Sign Up
        </Button>
        <Button as={Link} color="primary" href="#">
          Login
        </Button>
        <Theme />
      </NavbarContent>
    </Navbar>
  );
}
