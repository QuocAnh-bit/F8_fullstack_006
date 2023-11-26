import { getDictionary } from "../../../getDictionary";
import Content from "./layouts/Content";
import SideBar from "./layouts/SideBar";

const Home = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);
  const { userName, role, contactInfo, skills, education, projects, hobbies } =
    dict;
  return (
    <div className="dark dark:bg-gray-800 dark:text-white bg-white text-black rounded-md p-5 ">
      <div className="text-center my-1.5">
        <h2 className="text-xl  font-bold ">{userName}</h2>
      </div>
      <div className="flex flex-row gap-5 ">
        <SideBar role={role} skills={skills} education={education} />
        <Content
          contactInfo={contactInfo}
          projects={projects}
          hobbies={hobbies}
        />
      </div>
    </div>
  );
};

export default Home;
