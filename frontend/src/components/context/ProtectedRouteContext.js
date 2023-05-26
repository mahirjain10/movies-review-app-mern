import { createContext, useEffect, useState, useRef } from "react";

const ProtectedRouteContext = createContext();

const ProtectedRouteProvider = ({ children }) => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const isSignedUpRef = useRef(isSignedUp);

  const changeValue = () => {
    isSignedUpRef.current = !isSignedUp;
    setIsSignedUp((prev) => !prev);
  };

  const setValueInLS = () => {
    window.localStorage.setItem("isSignedUp", JSON.stringify(isSignedUpRef.current));
  };

  const getValueFromLS=()=>{
    return JSON.parse(window.localStorage.getItem("isSignedUp"));
  }

  const deleteValueFromLS = () => {
    window.localStorage.removeItem("isSignedUp");
  };
  
  useEffect(() => {
    console.log("hello");
    deleteValueFromLS();
  }, []);

  return (
    <ProtectedRouteContext.Provider
      value={{ isSignedUpRef, changeValue, setValueInLS, deleteValueFromLS ,getValueFromLS}}
    >
      {children}
    </ProtectedRouteContext.Provider>
  );
};

export { ProtectedRouteProvider};
export default ProtectedRouteContext;
