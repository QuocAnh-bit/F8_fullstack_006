import React, { Children } from "react";

export default function AdminLayout({ children }) {
  return (
    <>
      <header>
        <h1>AdminLayout</h1>
      </header>
      <main>{children}</main>
      <footer>
        <h1>ADMIN FOOTER</h1>
      </footer>
    </>
  );
}
