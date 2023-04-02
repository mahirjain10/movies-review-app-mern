import { useEffect, useState,createContext, useCallback, useRef} from "react"
import { useNavigate } from "react-router-dom";

const AuthContext =createContext()
const AuthProvider=({children})=>{
    const navigate=useNavigate();
    const [auth,setAuth]=useState(window.localStorage.getItem('authenticated') || false);
    
    const authRef=useRef(auth);
    const changeAuthValue=useCallback(()=>{
        console.log(authRef.current)
        // etAuth()
        console.log(authRef.current)
    },[])

    const addAuthValueInLS=(value)=>{
        console.log("addAuthValueInLS ran")
        window.localStorage.setItem('authenticated',value)
    }
    const removeAuthValueInLS=()=>{
        window.localStorage.removeItem('authenticated')
    }
    // useEffect(()=>{
    //     if(!auth){
    //         navigate('/not-found');
    //     }
    // },[])

    return(
        <AuthContext.Provider value={{auth,setAuth,changeAuthValue,addAuthValueInLS,removeAuthValueInLS}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider};
export default AuthContext;