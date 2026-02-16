
function Header(props) {
  return (
    <>
      <div className="p-2">
        <header className="flex items-center p-2 rounded">
          <img className="h-12 mx-2"  alt="Logo" />
          <div>
          <span className=" flex flex-row  font-bold text-xl text-opacity-50">Recruitment</span>
          <span className="text-lg text-gray-500">
            {props.name}
          </span>
          </div>
        </header>
      </div>
      ;
    </>
  );
}
export default Header;