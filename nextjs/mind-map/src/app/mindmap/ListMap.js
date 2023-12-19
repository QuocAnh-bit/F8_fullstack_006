"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import ModalDelete from "./ModalDelete";

import Link from "next/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Radio,
  RadioGroup,
  Button,
} from "@nextui-org/react";
import { datas } from "@/data/data";
import {
  deleteMindMap,
  getListMindMap,
  postListMindMap,
} from "@/utils/api/dataApi";
const check = false;
export default function ListMap() {
  const router = useRouter();
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromLocalStorage = async () => {
      await getListMindMap();
      const storedDatas = await getLocalStorage("datas");
      setLoading(false);
      if (storedDatas) {
        setListData(storedDatas);
      }
    };

    fetchDataFromLocalStorage();
  }, []);

  const newProject = {
    id: uuid(),
    name: "Dự án mới",
    dec: "Chưa có mô tả",
    nodes: [
      {
        id: "0",
        type: "inputNode",
        data: { label: "Node" },
        position: { x: 0, y: 50 },
      },
    ],
    edges: [],
  };

  const handleAdd = (e) => {
    postListMindMap(newProject);
    setListData((prevListData) => [...prevListData, newProject]);
  };

  const handleDelete = (id) => {
    deleteMindMap(id);
    setListData((prevListData) => {
      const newListData = prevListData.filter((item) => item.id !== id);

      console.log(newListData);

      return newListData;
    });
  };

  useEffect(() => {
    if (listData.length !== 0) {
      setLocalStorage("datas", listData);
    }
  }, [listData, setListData]);
  return (
    <div className="h-fit flex flex-col  my-5 h-screen gap-3">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Button color="primary" onClick={handleAdd}>
              Thêm mới
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg max-h-96">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="py-3 px-6">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Tên dự án
              </th>
              <th scope="col" className="py-3 px-6">
                Mô tả
              </th>
              <th scope="col" className="py-3 px-6">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {listData.length !== 0 ? (
              listData.map((item, index) => (
                <>
                  <tr className="bg-white border-b " key={item.id}>
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">
                      <Link href={`/mindmap/${item.id}`}>{item.name}</Link>
                    </td>
                    <td className="py-4 px-6">{item.dec}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-3">
                        <Button>
                          <Link href={`/mindmap/${item.id}`}>Sửa</Link>
                        </Button>
                        <ModalDelete handleDelete={handleDelete} id={item.id} />
                      </div>
                    </td>
                  </tr>
                </>
              ))
            ) : loading ? (
              <tr className="bg-white border-b">
                <td className="text-center h-28" colSpan="4">
                  {" "}
                  Loading ...
                </td>
              </tr>
            ) : (
              <tr className="bg-white border-b">
                <td className="text-center h-28" colSpan="4">
                  {" "}
                  Chưa có dự án nào
                </td>
              </tr>
            )}
            {/* <tr className="bg-white border-b ">
              <td className="py-4 px-6">Alex Johnson</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
