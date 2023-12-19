"use client";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

export const datas = getLocalStorage("datas");
// export const datas = [
//   {
//     id: uuid(),
//     name: "Chưa đặt tên",
//     dec: "Chưa có mô tả",
//     listNode: [
//       {
//         id: "0",
//         type: "inputCustom",
//         data: { label: "Node" },
//         position: { x: 0, y: 50 },
//       },
//     ],
//   },
//   {
//     id: uuid(),
//     name: "Chưa đặt tên2",
//     dec: "Chưa có mô tả2",
//     listNode: [
//       {
//         id: "0",
//         type: "inputCustom",
//         data: { label: "Node" },
//         position: { x: 0, y: 50 },
//       },
//     ],
//   },
// ];
