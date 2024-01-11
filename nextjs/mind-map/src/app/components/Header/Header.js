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
  NavbarMenuToggle,
  DropdownItem,
  NavbarMenu,
  Avatar,
  User,
} from "@nextui-org/react";
import logo from "../../../imgs/logo.png";
import { usePathname } from "next/navigation";
import cookieCutter, { get } from "@boiseitguru/cookie-cutter";
import { getCookie } from "cookies-next";

import { useState } from "react";

export default function Header({ user }) {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <Navbar
        maxWidth="xl"
        className="drop-shadow-md"
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarBrand
          className="gap-2"
          as={Link}
          href="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image src={`${logo.src}`} width={50} />
          <p className="text-2xl font-bold text-fuchsia-500">Mindmap</p>
        </NavbarBrand>
        <NavbarContent className="hidden md:flex lg:gap-4" justify="center">
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
        <NavbarContent className="hidden md:flex" justify="end">
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
                      name={`${user.name || user.nickname}`}
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
        <NavbarContent className="md:hidden" justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        {/* MObile */}
        <NavbarMenu>
          <NavbarContent
            className="flex-col w-full gap-5 items-start flex lg:gap-4"
            size="lg"
          >
            {user && (
              <>
                <NavbarItem>
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
                </NavbarItem>
                <NavbarItem onClick={() => setIsMenuOpen(false)}>
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
              </>
            )}
            <NavbarItem onClick={() => setIsMenuOpen(false)}>
              <Link
                color="foreground"
                href="/"
                className={`${path === "/" ? `text-blue-500 font-bold` : ""}`}
              >
                Trang chủ
              </Link>
            </NavbarItem>
            <NavbarItem onClick={() => setIsMenuOpen(false)}>
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
            <NavbarItem onClick={() => setIsMenuOpen(false)}>
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
            <NavbarItem onClick={() => setIsMenuOpen(false)}>
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
            {user ? (
              <NavbarItem>
                <Link className="text-blue-600" href={`/api/auth/logout`}>
                  Logout
                </Link>
              </NavbarItem>
            ) : (
              <NavbarItem>
                <Link
                  className="text-blue-600"
                  color="primary"
                  href={`/api/auth/login`}
                  variant="flat"
                >
                  Đăng nhập
                </Link>
              </NavbarItem>
            )}
          </NavbarContent>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
