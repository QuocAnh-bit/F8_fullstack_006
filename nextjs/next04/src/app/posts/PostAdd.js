"use client";
import { data } from "autoprefixer";
import { postApi } from "./PostList";
import { useState } from "react";
import { useSWRConfig } from "swr";
export default function PostAdd() {
  const { mutate } = useSWRConfig();

  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ title: name });
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const addPost = async (data) => {
    const response = await fetch(postApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      mutate(postApi);
      setName("");
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
