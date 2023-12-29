import React, { useState } from "react";
import Post from "./components/Post/Post";
import "bootstrap/dist/css/bootstrap.min.css";
import Notifications from "./components/Post/Notifications";

const App = () => {
  const [commentCount, setCommentCount] = useState(0);
  const handleSetCount = (number) => {
    setCommentCount(number);
  };
  return (
    <>
      <div className="container">
        <Notifications />
      </div>
      <Post onSetCount={handleSetCount} />
    </>
  );
};
export default App;
