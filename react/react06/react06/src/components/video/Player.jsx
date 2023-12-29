import React, { useEffect, useRef } from "react";
import Video from "./Video";
export default function Player() {
  const videoRef = useRef();
  //   useEffect(() => {
  //     videoRef.current.remove();
  //   }, []);
  return (
    <div>
      <Video ref={videoRef} />
      <hr />
      <button
        onClick={() => {
          videoRef.current.play();
        }}
      >
        Play
      </button>
      <button
        onClick={() => {
          videoRef.current.pause();
        }}
      >
        Pause
      </button>
    </div>
  );
}
