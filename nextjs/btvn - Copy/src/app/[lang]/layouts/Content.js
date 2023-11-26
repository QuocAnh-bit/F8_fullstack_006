"use client";
import { Button } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Link,
  Tooltip,
} from "@nextui-org/react";

export default function Content({ contactInfo, projects, hobbies }) {
  return (
    <div className="basis-3/4 p-3 gap-5 flex  flex-col  justify-between">
      <Card key="1" className="text-center py-3">
        <CardHeader key="1">
          {" "}
          <div>{contactInfo.contactTitle} </div>
        </CardHeader>
        <CardBody className="text-left">
          <ul>
            <li>
              <span>
                Phone:{" "}
                <Link href={`tel:${contactInfo.phone}`} target="__blank">
                  {contactInfo.phone}
                </Link>
              </span>
            </li>
            <li>
              <span>
                Zalo:{" "}
                <Link href={contactInfo.linkZalo} target="__blank">
                  {contactInfo.linkZalo}
                </Link>
              </span>
            </li>
            <li>
              <span>
                Facebook:{" "}
                <Link href={contactInfo.linkFacebook} target="__blank">
                  {contactInfo.linkFacebook}
                </Link>
              </span>
            </li>
            <li>
              <span>
                Email:{" "}
                <Link href={`mailto:${contactInfo.mail}`} target="__blank">
                  {contactInfo.linkEmail}
                </Link>
              </span>
            </li>
            <li>
              <span>
                Github:{" "}
                <Link href={contactInfo.linkGit} target="__blank">
                  {contactInfo.linkGit}
                </Link>
              </span>
            </li>
          </ul>
        </CardBody>
      </Card>
      <Card key="2" className="text-center ">
        <CardHeader>{projects.title}</CardHeader>

        {projects.project.map((item, index) => {
          return (
            <>
              <CardBody key={index} className="flex ">
                <div>
                  <h4>{item.nameProject}</h4>
                  <p>{item.workTime}</p>
                  <p>{item.webUse}</p>
                </div>
                <div className="flex m-2 gap-5 ">
                  <Tooltip
                    placement={"bottom"}
                    content={"https://github.com/QuocAnh-bit"}
                    color="secondary"
                  >
                    <Button
                      color="danger"
                      href="https://f8-fullstack-006-c55v.vercel.app/"
                      as={Link}
                      target="_blank"
                    >
                      Demo
                    </Button>
                  </Tooltip>
                  <Tooltip
                    placement={"bottom"}
                    content={
                      "https://github.com/QuocAnh-bit/F8_fullstack_006/tree/main/nextjs/btvn"
                    }
                    color="secondary"
                  >
                    <Button
                      color="danger"
                      href="https://github.com/QuocAnh-bit/F8_fullstack_006/tree/main/nextjs/btvn"
                      as={Link}
                      target="_blank"
                    >
                      Git
                    </Button>
                  </Tooltip>
                </div>
              </CardBody>
              <Divider />
            </>
          );
        })}
      </Card>
      <Card key="3" className="text-center">
        <CardHeader>{hobbies.title}</CardHeader>
        <CardBody className="text-left">
          <ul>
            {hobbies.listHobbies.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
