const Menu = ({ menu, onReceiveData }) => {
  const handleClick = () => {
    onReceiveData("aa");
  };
  return (
    <>
      <nav className="menu">
        {menu?.length &&
          menu?.map(({ id, link, title }) => (
            <li key={id}>
              <a href={link}>{title}</a>
            </li>
          ))}
      </nav>
      <hr />
      <button onClick={handleClick}>Click</button>
    </>
  );
};
export default Menu;
