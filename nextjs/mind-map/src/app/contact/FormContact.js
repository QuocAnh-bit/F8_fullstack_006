"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import { Input, Textarea, Button, Spinner } from "@nextui-org/react";
import { useState } from "react";
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID;
const USER_ID = process.env.NEXT_PUBLIC_EMAIL_JS_USER_ID;
export default function FormContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.name && form.email && form.message) {
      setStatus(true);
      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, form, USER_ID)
        .then((response) => {
          toast.success("Gửi thành công", { position: "bottom-right" });
          setStatus(false);
          setForm({
            name: "",
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          setStatus(false);
          console.error("Email failed to send:", error);
        });
    } else {
      toast.warning("Vui lòng nhập đủ trường", { position: "bottom-right" });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          variant="underlined"
          label="Tên"
          onChange={handleChange}
          value={form.name}
        />
        <Input
          type="email"
          variant="underlined"
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Textarea
          label="Tin Nhắn"
          variant="underlined"
          placeholder="Nhập tin nhắn của bạn tại đây "
          disableAnimation
          disableAutosize
          classNames={{
            base: "max-w-xl",
            input: "resize-y min-h-[40px]",
          }}
          name="message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <Button type="submit" color="primary" isLoading={status ? true : false}>
          {status ? "Đang gửi tin nhắn của bạn..." : "Gửi"}
        </Button>
      </form>
      <ToastContainer />
    </>
  );
}
