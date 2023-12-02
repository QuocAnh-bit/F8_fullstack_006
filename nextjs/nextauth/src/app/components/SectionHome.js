import imgTrending1 from "@/imgHomePage/imgTrending1.jpg";
import imgTrending2 from "@/imgHomePage/imgTrending2.jpg";
import imgTrending3 from "@/imgHomePage/imgTrending3.jpg";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  ButtonGroup,
} from "@nextui-org/react";

export default async function SectionHome() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div>
        <div className="relative mb-20 rounded-xl  bg-cover bg-center h-72 bg-[url('https://images.pexels.com/photos/8417307/pexels-photo-8417307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
          <div className="flex-col text-xl rounded-xl text-white h-full w-full bg-black/40 flex items-center	justify-center">
            {session?.user?.name ? (
              <>
                <h1 className="text-3xl  italic 	 font-extrabold">
                  {`Chào mừng ${session?.user?.name} !`}
                </h1>
                <p>Chúc bạn một ngày tốt lành !</p>
              </>
            ) : (
              <>
                <h1 className="text-3xl  italic 	 font-extrabold">
                  Chào mừng bạn đến với JunX !
                </h1>
                <p>Vui lòng đăng nhập để đăng blog !</p>
              </>
            )}
          </div>
          <div className="absolute overflow-hidden	 shadow-xl rounded-3xl w-fit bottom-15 left-2/4 right-2/4 -translate-x-2/4 -translate-y-2/4 z-10 ">
            <ButtonGroup className="  ">
              <Button
                as={Link}
                href={"/blogs"}
                className="font-bold w-52 h-16 bg-slate-100 hover:text-white hover:bg-gray-400 dark:bg-slate-800"
              >
                Blogs
              </Button>
              <Button
                as={Link}
                href={"/profile"}
                className="font-bold w-52  h-16  border-x bg-slate-100 hover:text-white hover:bg-gray-400 dark:bg-slate-800"
              >
                {" "}
                Khám phá Profile
              </Button>
              <Button
                as={Link}
                href={"/auth"}
                className="font-bold w-52 h-16 bg-slate-100 hover:text-white hover:bg-gray-400 dark:bg-slate-800"
              >
                Đăng Nhập
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <rect
                      width={48}
                      height={48}
                      fill="white"
                      fillOpacity="0.01"
                    />{" "}
                    <path
                      d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                      fill="#2F88FF"
                      stroke="#e1d6d6"
                      strokeWidth={4}
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      d="M14.4917 24.5H32.4917"
                      stroke="white"
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      d="M23.4917 15.5L32.4917 24.5L23.4917 33.5"
                      stroke="white"
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                  </g>
                </svg>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <h3 className="text-2xl">Nội Dung Nổi Bật</h3>
      <div className="max-w-[1280px] grid grid-rows-3 grid-flow-col gap-2 my-5">
        <Card
          as={Link}
          href={"/blogs"}
          color="success"
          className="row-span-3 h-[300px]"
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              What to watch
            </p>
            <h4 className="text-white font-medium text-large">
              Stream the Acme event
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={`${imgTrending1.src}`}
          />
        </Card>
        <Card className=" h-[146px]" as={Link} href={"/blogs"}>
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              What to watch
            </p>
            <h4 className="text-white font-medium text-large">
              Stream the Acme event
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={`${imgTrending2.src}`}
          />
        </Card>
        <Card className=" h-[146px] " as={Link} href={"/blogs"}>
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              What to watch
            </p>
            <h4 className="text-white font-medium text-large">
              Stream the Acme event
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={`${imgTrending3.src}`}
          />
        </Card>
      </div>
    </div>
  );
}
