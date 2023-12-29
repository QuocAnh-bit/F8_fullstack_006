"use client";
import style from "./checkOut.scss";
import { useState } from "react";
import useSWR from "swr";

const _PROVINCE_API = `http://localhost:3000/api/province`;
const _DISTRICT_API = `http://localhost:3000/api/district`;
const _INIT_FALLBACK_DATA = {
  data: [],
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
  const [status, setStatus] = useState(0);
  const { data: province } = useSWR(_PROVINCE_API, fetcher, {
    fallbackData: _INIT_FALLBACK_DATA,
  });
  const { data: district } = useSWR(
    `${_DISTRICT_API}?province_id=${status}`,
    fetcher,
    {
      fallbackData: _INIT_FALLBACK_DATA,
    }
  );
  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  console.log(district);
  return (
    <div>
      <h1>Check Out</h1>
      <select name="" id="" onChange={handleChange}>
        {province &&
          province?.data?.map((item, index) => (
            <option key={index} value={`${item.code}`}>
              {item.name}
            </option>
          ))}
      </select>
      <select name="" id="">
        {district &&
          district?.data?.map((item, index) => (
            <option key={index} value={`${item.code}`}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
}
