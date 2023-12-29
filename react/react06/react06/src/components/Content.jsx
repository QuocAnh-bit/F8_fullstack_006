import { memo } from "react";

const Content = () => {
  console.log("render");
  return <div>Content</div>;
};

export default memo(Content);

// chi render khi props thay doi
