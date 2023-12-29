"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navigation() {
  const pathName = usePathname();
  return (
    <ul>
      <li className={clsx(pathName === "/" && "active")}>
        <Link href={"/"}>Trang chủ</Link>
      </li>
      <li className={clsx(pathName === "/products" && "active")}>
        <Link href={"/products"}>Sản Phẩm</Link>
      </li>
      <li className={clsx(pathName === "/tin-tuc" && "active")}>
        <Link href={"/tin-tuc"}>Tin tức</Link>
      </li>
    </ul>
  );
}
