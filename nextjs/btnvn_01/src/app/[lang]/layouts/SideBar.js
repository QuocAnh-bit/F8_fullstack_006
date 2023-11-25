"use client";
import { Image } from "@nextui-org/react";

export default function SideBar({ role, skills, education }) {
  return (
    <div className="basis-1/4 flex flex-col gap-5">
      <figure>
        <Image
          width={300}
          alt="NextUI hero Image"
          src="https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/319362875_1223210891633488_2030886700528507308_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=l0uyyiCpb18AX8jGKur&_nc_ht=scontent.fhan5-10.fna&oh=00_AfBFCalxpnJLq6Im9FkLDGWK-Dx7Rvj9tc62d92scZxRXg&oe=6566ACC0"
        />
        <figcaption className="text-center my-1">{role}</figcaption>
      </figure>
      <div className="flex gap-2  ">
        <p className="text-sm"> {skills.skillsTitle} </p>
        <hr className="basis-3/4 self-end" />
      </div>
      <div>
        <h3>{skills.skillWork.skillTitle}</h3>
        <p>{skills.skillWork.skillContent}</p>
      </div>
      <div>
        <h3>{skills.skillOther.skillTitle}</h3>
        <p>{skills.skillOther.skillContent}</p>
      </div>
      <div className="flex gap-2  ">
        <p className="text-sm">{education.titleEducation}</p>
        <hr className="basis-3/4 self-end" />
      </div>
      <div>
        {education.historyEducation.map(({ year, school }, index) => (
          <h3 key={index}>
            <span>{year}: </span>
            {school}
          </h3>
        ))}
      </div>
    </div>
  );
}
