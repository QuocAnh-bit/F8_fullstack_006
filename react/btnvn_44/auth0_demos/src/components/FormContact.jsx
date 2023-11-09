import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";
import "../asset/FormContact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const REACT_APP_SERVICE_ID = import.meta.env.VITE_REACT_APP_SERVICE_ID;
const REACT_APP_TEMPLATE_ID = import.meta.env.VITE_REACT_APP_TEMPLATE_ID;
const REACT_APP_USER_ID = import.meta.env.VITE_REACT_APP_USER_ID;

export const ContactUs = () => {
  const form = useRef();
  const { user, isAuthenticated } = useAuth0();
  const [isLoading, setLoading] = useState(false);
  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.warning("Đang gửi...");

    var templateParams = {
      to_name: user.name,
      to_email: e.target.user_email.value,
      message: e.target.message.value,
    };

    emailjs
      .send(
        REACT_APP_SERVICE_ID,
        REACT_APP_TEMPLATE_ID,
        templateParams,
        REACT_APP_USER_ID
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          toast.success(`đã gửi thành công đến ${e.target.user_email.value}`);
          setLoading(false);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    e.target.message.value = "";
  };

  return (
    <>
      {isAuthenticated && (
        <form ref={form} onSubmit={sendEmail} className="form-contact">
          <label>Email</label>
          <input
            type="email"
            name="user_email"
            defaultValue={user.email}
            placeholder="Vui lòng nhập email của bạn"
          />
          <label>Message</label>
          <textarea
            name="message"
            defaultValue="Xin Chào bạn muốn gửi tin nhắn gì ?"
            placeholder="Nhập tin nhắn tại đây"
          />
          <input type="submit" defaultValue="Gửi ngay" />
        </form>
      )}
      {isLoading && <Loading />}
      <ToastContainer />
    </>
  );
};
