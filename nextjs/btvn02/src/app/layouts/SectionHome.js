import React from "react";
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
      <div>
        <div className=" rounded-lg bg-cover bg-bottom h-72 bg-[url('https://virtualbackgrounds.site/wp-content/uploads/2020/08/hotel-view-over-central-park.jpg')]"></div>
      </div>
      <div className="max-w-[1280px] grid grid-rows-3 grid-flow-col gap-2 my-5">
        <Card className="row-span-3 h-[300px]">
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
            src="https://i.pinimg.com/originals/78/ab/f2/78abf2aaacded6e4c43821d270119a79.jpg"
          />
        </Card>
        <Card className=" h-[150px]">
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
            src="https://i.pinimg.com/564x/fb/c7/80/fbc780a92bb963a850ba964884e568af.jpg"
          />
        </Card>
        <Card className=" h-[150px]">
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
            src="https://i.pinimg.com/564x/cd/0d/ef/cd0def7c1e5d58b2715085de1346b672.jpg"
          />
        </Card>
      </div>
    </>
  );
}
