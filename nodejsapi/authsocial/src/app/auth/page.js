import React from "react";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Auth() {
  return (
    <div className="w-full flex justify-center h-96 items-center">
      <div className="w-1/3 flex-col flex gap-2 text-center bg-slate-300 p-9 rounded-xl">
        <h3 className="font-semibold mb-2 text-xl ">Đăng nhập mạng xã hội</h3>
        <Link
          className="bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-3 uppercase"
          href={`https://auth-passport.vercel.app/api/auth/google`}
        >
          <FaGoogle size={20} />
          Continue with Google
        </Link>
        <div class=" flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-white after:mt-0.5 after:flex-1 after:border-t after:border-white">
          <p class="mx-4 mb-0 text-center font-semibold ">Or</p>
        </div>
        <Link
          className="bg-black hover:bg-black/70  text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-3 uppercase"
          href={`https://auth-passport.vercel.app/api/auth/github`}
        >
          <FaGithub size={20} />
          Continue with GitHub
        </Link>
      </div>
    </div>
  );
}
