import { useContext } from "react";
import { BsSun,BsMoon } from "react-icons/bs";
import { Link } from "react-router-dom";
import ThemeContext from "../context/Theme";
import Input from "../form/Input";

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="bg-secondary fixed top-0 w-full h-14 z-10 flex flex-row justify-evenly">
      <div className="flex items-center">
        <img src="./logo.png" />
      </div>
      <div className="flex flex-row items-center">
        {theme === "dark" ? (
          <BsSun
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white mr-4 cursor-pointer" size={33} 
          />
        ) : (
          <BsMoon
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white mr-4 cursor-pointer" size={33}
          />
        )}
        <Input
          type="text"
          className="font-[400px] p-3 mr-3 h-11"
          placeholder="search..."
        />
        <Link to="/auth/sign-in">
          <div className="text-white font-poppins text-[20px]">Log in</div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
