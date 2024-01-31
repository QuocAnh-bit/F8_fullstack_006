"use client";
import { getProfile, getUser, getUsers } from "@/utils/serviceApi/dataApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import ListUser from "./components/sections/ListUser";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listUser, setListUser] = useState(null);

  useEffect(() => {
    const dataProfile = async () => {
      const data = await getProfile();
      setLoading(false);
      if (data) {
        setUser(data.user);
      }
    };

    const dataUsers = async () => {
      const data = await getUsers();
      setLoading(false);
      if (data) {
        setListUser(data.data);
      }
    };
    dataProfile();
    dataUsers();
  }, []);
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <>
          <div className="my-3 ">
            <div className="flex gap-3 my-3">
              <div className="rounded-lg overflow-hidden w-fit">
                <Image
                  src={user && user.avatar}
                  width={100}
                  height={200}
                  alt="Avatar"
                />
              </div>
              <div className="self-end	">
                <h3>{user && user.name}</h3>
                <h3>{user && user.email}</h3>
              </div>
            </div>

            <div className="flex justify-between">
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <div
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  {user && user?.provider.google ? (
                    <div className="flex gap-2 items-center">
                      <div className="rounded-lg overflow-hidden w-fit">
                        <Image
                          src={user?.provider.google.image}
                          width={20}
                          height={20}
                          alt="Avatar"
                        />
                      </div>
                      <div>Đã đăng nhập</div>
                      <FaGoogle />
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <div>Chưa đăng nhập</div>
                      <FaGoogle />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  {user && user?.provider.github ? (
                    <div className="flex gap-2 items-center">
                      <div className="rounded-lg overflow-hidden w-fit">
                        <Image
                          src={user?.provider.github.image}
                          width={20}
                          height={20}
                          alt="Avatar"
                        />
                      </div>
                      <div>Đã đăng nhập</div>
                      <FaGithub />
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <div>Chưa đăng nhập</div>
                      <FaGithub />
                    </div>
                  )}
                </button>
              </div>

              <div>
                <Link href={`https://auth-passport.vercel.app/api/logout`}>
                  Đăng xuất
                </Link>
              </div>
            </div>
            <hr className="my-2" />
          </div>
        </>
      )}
      {!loading && <ListUser data={listUser} />}
    </>
  );
}
