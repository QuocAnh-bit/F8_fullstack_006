"use server";
import {
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";

import { getSession } from "@auth0/nextjs-auth0";

export default async function ItemLogin() {
  const { user } = await getSession();
  return (
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
  );
}
