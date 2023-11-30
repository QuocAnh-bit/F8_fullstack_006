"use client";
import { Input, Button } from "@nextui-org/react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NEXT_PUBLIC_SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const NEXT_PUBLIC_TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const NEXT_PUBLIC_USER_ID = process.env.NEXT_PUBLIC_USER_ID;

export default function FormBooking() {
  const form = useRef();
  const sendEmail = async (e) => {
    e.preventDefault();

    await emailjs
      .sendForm(
        NEXT_PUBLIC_SERVICE_ID,
        NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        NEXT_PUBLIC_USER_ID
      )
      .then(
        (result) => {
          toast.success("Bạn đã đặt thành công");
        },
        (error) => {
          toast.error("Bạn đặt thất bại. Vui lòng thử lại!");
        }
      );
    form.current.reset();
  };

  return (
    <div className="bg-orange-200 dark:bg-slate-600  flex flex-col p-5 rounded-lg ">
      <h3 className="text-center m-5 font-bold text-xl">
        Ưu Đãi 30.000.000 Cho 5người/3ngày
      </h3>
      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5 ">
        <Input
          key={"inside"}
          type="email"
          label="Email"
          labelPlacement={"inside"}
          required
        />
        <Input
          key={"inside"}
          type="text"
          label="Số điện thoại"
          labelPlacement={"inside"}
          required
        />

        <Input key={"inside"} type="date" labelPlacement={"inside"} />
        <Input
          key={"inside"}
          type="number"
          label="Số lượng người"
          labelPlacement={"inside"}
          required
        />

        <Button type="submit"> Đặt ngay</Button>
      </form>
      <ToastContainer />
    </div>
  );
}
