/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import logo from "../../../imgs/logo.png";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const { user, error, isLoading } = useUser();

  return (
    <div>
      <Navbar maxWidth="xl" className="drop-shadow-md">
        <NavbarBrand className="gap-2">
          <Image src={`${logo.src}`} width={50} />
          <p className="text-2xl font-bold text-fuchsia-500">Mindmap</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link
              color="foreground"
              href="/"
              className={`${path === "/" ? `text-blue-500 font-bold` : ""}`}
            >
              Trang chủ
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/about"
              aria-current="page"
              className={`${
                path === "/about" ? `text-blue-500 font-bold` : ""
              }`}
            >
              Giới thiệu
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href={`/pricing`}
              className={`${
                path === "/pricing" ? `text-blue-500 font-bold` : ""
              }`}
            >
              Bảng giá
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href={"/contact"}
              className={`${
                path === "/contact" ? `text-blue-500 font-bold` : ""
              }`}
            >
              Liên Hệ
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {user ? (
            <NavbarItem>
              <Link
                color="foreground"
                href={"/mindmap"}
                className={`${
                  path === "/mindmap" ? `text-blue-500 font-bold` : ""
                }`}
              >
                MindMap
              </Link>
            </NavbarItem>
          ) : (
            ""
          )}
          {user ? (
            <>
              {" "}
              <NavbarItem>
                {" "}
                <Dropdown placement="bottom-start">
                  <DropdownTrigger>
                    <User
                      as="button"
                      avatarProps={{
                        isBordered: true,
                        src: user.picture,
                      }}
                      className="transition-transform"
                      description={`${user.email ? user.email : ""}`}
                      name={`${user.name}`}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem
                      key="logout"
                      color="danger"
                      as={Link}
                      href={`/api/auth/logout`}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href={`/api/auth/login`}
                variant="flat"
              >
                Đăng nhập
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  );
}
