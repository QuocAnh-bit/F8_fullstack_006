import Menu from "./Menu";
import Footer from "./Footer";
const Header = ({ title, name, age }) => {
  const menu = [
    {
      id: 1,
      link: "#",
      title: "Menu 1",
    },
    {
      id: 2,
      link: "#",
      title: "Menu 2",
    },
    {
      id: 3,
      link: "#",
      title: "Menu 3",
    },
  ];
  const handleReceiveData = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>AAA</h1>
      <h2>{title}</h2>
      <Menu menu={menu} onReceiveData={handleReceiveData} />
      <Footer>
        <h3>Quốc Anh</h3>
      </Footer>
    </div>
  );
};
export default Header;
