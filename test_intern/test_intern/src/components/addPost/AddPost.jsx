import React, { useState } from "react";
import "../addPost/addPost.scss";
import Button from "../Button";
export default function AddPost() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ title: "", desc: "", tags: [] });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "tags") {
      const updatedTags = [...form.tags];
      const index = updatedTags.indexOf(value);
      index === -1 ? updatedTags.push(value) : updatedTags.splice(index, 1);
      setForm((prevState) => ({
        ...prevState,
        [name]: updatedTags,
      }));
    } else {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    console.log(form);
  };
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="btn-style"
      >
        {" "}
        Add new
      </button>
      <div className={`overlay ${isOpen ? "show" : ""}`}>
        <div className="popup">
          <div className="wrap-title">
            <h2>Thêm post</h2>
            <button
              className="close"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              &times;
            </button>
          </div>
          <div className="content">
            <form action="" onSubmit={handleSubmit}>
              <div className="item-form">
                <label htmlFor="">Tiêu đề</label>
                <input type="text" name="title" onChange={handleChange} />
              </div>
              <div className="item-form">
                <label htmlFor="">Miêu tả</label>
                <textarea type="text" name="desc" onChange={handleChange} />
              </div>
              <div className="item-form">
                <div>Tags</div>
                <label htmlFor="">
                  <input
                    type="checkbox"
                    name="tags"
                    value={"Html"}
                    onChange={handleChange}
                  />{" "}
                  Html
                </label>
                <label htmlFor="">
                  <input
                    type="checkbox"
                    name="tags"
                    onChange={handleChange}
                    value={"Css"}
                  />{" "}
                  Css
                </label>
                <label htmlFor="">
                  <input type="checkbox" name="tags" onChange={handleChange} />{" "}
                  Html
                </label>
              </div>
              <Button btnText={"Thêm mới"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
