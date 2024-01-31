"use client";
import { getDetail } from "@/utils/serviceApi/dataApi";
import React, { useEffect, useState } from "react";

export default function Page({ params }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const dataDetail = async () => {
      const data = await getDetail(params.id);
      setLoading(false);
      if (data) {
        setDetail(data.data);
      }
    };
    dataDetail();
  }, []);
  return (
    <div>
      {loading ? (
        "Loading"
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tên thông tin
                </th>
                <th scope="col" className="px-6 py-3">
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Tên
                </th>
                <td className="px-6 py-4">{detail.name}</td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Email
                </th>
                <td className="px-6 py-4">{detail.email}</td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Access_token
                </th>
                <td className="px-6 py-4">{detail.access_token}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ID
                </th>
                <td className="px-6 py-4">{detail.id}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Avatar
                </th>
                <td className="px-6 py-4">{detail.avatar}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Tên nhà cung cấp
                </th>
                <td className="px-6 py-4">{detail.providers.name}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Created_at
                </th>
                <td className="px-6 py-4">{detail.created_at}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
