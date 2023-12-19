import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col space-y-10 justify-center p-10 bg-stone-200">
      <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <a className="hover:text-gray-900" href="#">
          Home
        </a>
        <a className="hover:text-gray-900" href="#">
          About
        </a>
        <a className="hover:text-gray-900" href="#">
          Services
        </a>
        <a className="hover:text-gray-900" href="#">
          Media
        </a>
        <a className="hover:text-gray-900" href="#">
          Gallery
        </a>
        <a className="hover:text-gray-900" href="#">
          Contact
        </a>
      </nav>
      <div className="flex justify-center space-x-5"></div>
      <p className="text-center text-gray-700 font-medium">
        © 2022 Company Ltd. All rights reservered.
      </p>
    </footer>
  );
}
