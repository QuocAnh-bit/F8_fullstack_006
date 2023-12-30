import React from "react";
import { Hearts, ThreeDots } from "react-loader-spinner";
import Styles from "./loading.module.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";

export default function Loading() {
  const visible = useSelector((state) => state.loading.visible);
  return (
    visible && (
      <div className={clsx(Styles.loading)}>
        <p>Đang đồng bộ ...</p>
      </div>
    )
  );
}
