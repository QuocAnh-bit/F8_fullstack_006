"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGoAdmin = () => {
    router.push("/admin");
  };

  return (
    <div>
      <h1>Trang chủ f8</h1>
      <h3>
        <Link href={"/products"}>Danh sách sản phẩm</Link>
      </h3>
      <button onClick={handleGoAdmin}>GOOO</button>
    </div>
  );
}
