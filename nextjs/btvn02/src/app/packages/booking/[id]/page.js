import { getPostDetail } from "@/Api/DataApi/getData";
import { SERVER_IMG } from "@/Api/config/config.json";
import FormBooking from "../components/FormBooking";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Link,
  Button,
  ButtonGroup,
} from "@nextui-org/react";
export default async function pageDetail({ params }) {
  const { id } = params;
  const detail = await getPostDetail(id);
  console.log(detail);
  return (
    <div className="flex ">
      <div className="flex  flex-col gap-10 m-5 self-center basis-1/2">
        <FormBooking />
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 py-5 basis-1/2">
        {detail.destinationBox.map((item, index) => {
          if (index >= 6) {
            return;
          } else {
            return (
              <Card shadow="sm" key={index}>
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.h3}
                    className="w-full object-cover h-[200px]"
                    src={`${SERVER_IMG}${item.src}`}
                  />
                </CardBody>

                <CardBody className="text-small">
                  <b>{item.h3}</b>
                </CardBody>
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
}
