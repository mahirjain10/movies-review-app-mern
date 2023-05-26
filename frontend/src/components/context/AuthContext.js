import {createContext,useContext,useEffect,useState} from 'react'
import useAPI from '../hooks/useApi';
import  refreshTokenApi from '../../apis/refreshTokenApi';
import axios from 'axios';
import { useRef } from 'react';
const AuthContext=createContext();

const AuthProvider=({children})=>{
    const {request}=useAPI(refreshTokenApi)
    const [isLoggedIn,setIsLoggedIn]=useState(window.localStorage.getItem('isLoggedIn')||false);
    const isLoggedInRef=useRef(isLoggedIn);

    const setIsLoggedInValueInLS=()=>{
      window.localStorage.setItem('isLoggedIn',JSON.stringify(isLoggedInRef.current))
    }
    const changeValueOfIsLoggedIn=(value)=>{
      isLoggedInRef.current=value
      setIsLoggedIn(value);
    }
    const removeValueFromLS=()=>{
      window.localStorage.removeItem('isLoggedIn')
    }
    
    useEffect(() => {
        console.log("i am in useEffect");
        if (isLoggedIn) {
          console.log("in if of useEffect");
          const intervalId = setInterval(async () => {
            request(false);
          }, 5000);
          return () => clearInterval(intervalId);
        }
      });
      

    return (
        <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,changeValueOfIsLoggedIn,removeValueFromLS,setIsLoggedInValueInLS}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider}
export default AuthContext;