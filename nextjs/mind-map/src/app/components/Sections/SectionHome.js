"use client";
import Link from "next/link";
import imgHome from "../../../imgs/homeImg.jpg";
import imgHome1 from "../../../imgs/homeImg1.jpg";
import imgHome2 from "../../../imgs/homeImg2.jpg";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
export default function SectionHome() {
  return (
    <>
      <div className=" relative overflow-hidden rounded-2xl h-80 bg-center bg-cover bg-bgrHome my-6 ">
        <div className="text-lg  absolute gap-5 text-white lg:text-3xl inset-0 bg-black/70 flex  flex-col justify-center items-center">
          <p>Tất cả bất đầu với một ý tưởng.</p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold">
            Hãy bắt đầu với Mind Map
          </h1>
        </div>
      </div>
      <div className="max-w-[1280px]  grid grid-rows-2 grid-flow-col gap-2 my-5">
        <Card
          as={Link}
          href={`/api/auth/login`}
          color="success"
          className="row-span-3 h-[300px]"
        >
          <CardHeader className="items-center md:justify-center  inset-0   bg-black/20 gap-3 absolute z-10  flex-col lg:!items-end ">
            <h4 className="text-2xl  text-white font-medium md:text-3xl text-right">
              Hãy bắt đầu với ý tưởng của bạn
            </h4>
            <Button className="hidden md:flex">Tạo ngay</Button>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover object-center 	"
            src={imgHome.src}
          />
        </Card>
        <Card className=" h-[146px] " as={Link} href={"/contact"}>
          <CardHeader className="items-start justify-start   inset-0  bg-black/20 absolute z-10  flex-col lg:!items-start">
            <h4 className="text-white font-medium text-large">Liên hệ</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover object-top "
            src={imgHome1.src}
          />
        </Card>
        <Card className=" h-[146px] " as={Link} href={"/pricing"}>
          <CardHeader className="absolute  items-start justify-start  inset-0  bg-black/20 z-10  flex-col lg:!items-start">
            <h4 className="text-white font-medium text-large">Bảng giá</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={imgHome2.src}
          />
        </Card>
      </div>
    </>
  );
}
