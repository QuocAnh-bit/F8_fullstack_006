import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButtin";
import { ContactUs } from "./FormContact";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    toast.success("Đăng nhập thành công");
  }

  return (
    isAuthenticated && (
      <>
        <div className="wrapper-profile">
          <img src={user.picture} alt={user.name} />
          <h3>Xin chào: {user.name}</h3>
          <p>
            Email: <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
          <ContactUs />
          <LogoutButton />
        </div>
        <ToastContainer />
      </>
    )
  );
};

export default Profile;
