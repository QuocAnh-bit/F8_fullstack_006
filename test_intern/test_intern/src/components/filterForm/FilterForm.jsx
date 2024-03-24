// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function FilterForm({ onSubmit }) {
  const [searchTitle, setSearchTitle] = useState("");
  const timeOutRef = useRef(null);
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTitle(value);
    if (!onSubmit) return;
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    timeOutRef.current = setTimeout(() => {
      const form = {
        searchTitle: value,
      };
      onSubmit(form);
    }, 300);
  };
  return (
    <div>
      <form action="">
        <input type="text" value={searchTitle} onChange={handleSearch} />
      </form>
    </div>
  );
}
