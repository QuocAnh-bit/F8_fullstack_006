"use server";
import { getServerSession } from "next-auth";
import Facebook from "./components-svg/Facebook";
import Github from "./components-svg/Github";
import Theme from "./Theme";
import { authOptions } from "../api/auth/[...nextauth]/route";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Tooltip,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import Test from "./Test";
import Link from "next/link";

export default async function NavMenu({ params }) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <Navbar maxWidth="lg">
      <NavbarBrand className="flex gap-3 ">
        <Link href={"/"} className="font-bold text-inherit text-3xl">
          JunX Web
        </Link>
      </NavbarBrand>
      <NavbarContent className="flex gap-3  ">
        <Link href={"/profile"} className="font-bold text-inherit text-xl">
          Profile
        </Link>
        <Link href={"/blogs"} className="font-bold text-inherit text-xl">
          Blogs
        </Link>
        <Link href={"/contact"} className="font-bold text-inherit text-xl">
          Contact
        </Link>
      </NavbarContent>
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
        <NavbarItem className="flex gap-2">
          {session?.user?.name ? (
            <>
              <User
                name={`${session?.user?.name}`}
                description={`${session?.user?.email}`}
                avatarProps={{
                  src: `${session?.user?.image}`,
                }}
              />
              <Test />
            </>
          ) : (
            <Button as={Link} color="primary" href={"/auth"}>
              Sign In
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
