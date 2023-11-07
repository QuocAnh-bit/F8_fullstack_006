import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";
import "../asset/FormContact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ContactUs = () => {
  const form = useRef();
  const { user, isAuthenticated } = useAuth0();
  const [isLoading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.warning("Đang gửi...");

    emailjs
      .sendForm(
        "service_9qu4uom",
        "template_x0j78vt",
        form.current,
        "7hGOQubnSa8zyplA2"
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          toast.success("Gửi thành công !");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      {isAuthenticated && (
        <form ref={form} onSubmit={sendEmail} className="form-contact">
          <label>Email</label>
          <input type="email" name="user_email" defaultValue={user.email} />
          <label>Message</label>
          <textarea
            name="message"
            defaultValue="Xin Chào bạn muốn gửi tin nhắn gì ?"
          />
          <input type="submit" defaultValue="Gửi ngay" />
        </form>
      )}
      {isLoading && <Loading />}
      <ToastContainer />
    </>
  );
};
