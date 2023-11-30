import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { getPosts } from "@/Api/DataApi/getData";
import { SERVER_IMG } from "@/Api/config/config.json";
import Link from "next/link";

export const metadata = {
  title: "packages",
};

const Posts = async () => {
  const posts = await getPosts();
  return (
    <>
      <h2 className="text-3xl text-center py-5 font-bold italic">Ưu đãi</h2>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 py-5">
        {posts.map((item, index) => (
          <Card shadow="sm" key={index}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.home.name}
                className="w-full object-cover h-[140px]"
                src={`${SERVER_IMG}${item.destinationBox[0].src}`}
              />
            </CardBody>
            <CardBody className="text-xl">
              <b>{item.home.name}</b>
              <p className="text-default-500">{item.home.content}</p>
            </CardBody>
            <CardFooter className="text-small justify-between">
              <p>Chuyến Đi Dành Cho Gia Đình 3N/2Đ</p>
              <Button as={Link} href={`/packages/${item.id}`}>
                Đặt Ngay
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Posts;
