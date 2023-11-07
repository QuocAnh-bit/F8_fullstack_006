import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../asset/Login.css";
import Loading from "./Loading";

const LoginButton = () => {
  const { loginWithPopup, isLoading, isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <div className="content-login">
          <h3>Cảm ơn bạn đã sử dụng dịch vụ của F8</h3>
          <p>
            Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi
            tại đây!
          </p>
          <button onClick={() => loginWithPopup()}>Log In || Register</button>
        </div>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default LoginButton;
