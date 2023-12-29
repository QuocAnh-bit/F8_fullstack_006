import React from "react";
import Image from "next/image";
export default function page() {
  return (
    <div>
      <h1>Home Page</h1>
      <Image
        src="/assets/img/img01.jpg"
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
  );
}
