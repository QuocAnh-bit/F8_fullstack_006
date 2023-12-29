import React, { forwardRef, useImperativeHandle, useRef } from "react";
import video from "../video/video.mp4";
function Video(props, ref) {
  const videoRef = useRef(); // ref nội bộ
  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current.play();
    },
    pause: () => {
      videoRef.current.pause();
    },
  }));
  return <video ref={videoRef} src={video} />;
}
export default forwardRef(Video);
