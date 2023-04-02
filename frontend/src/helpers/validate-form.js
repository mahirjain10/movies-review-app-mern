const validateForm=({name,email,password})=>{
    console.log(name)
    const nameRegex=/^[a-z A-z]{3,20}$/
    const emailRegex=/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

    if(!name.trim()) return {ok:false,error:"name is missing"}
    if(!nameRegex.test(name)) return {ok:false, error:"name is invalid"}
    if(!email.trim()) return{ok:false,error:"email is missing"}
    if(!emailRegex.test(email)) return{ok:false,error:"email is invalid"}
    if(!password.trim()) return {ok:false,error:"password is missing"}
    console.log(password.length)
    if(password.length<8 || password.length>15) return {ok:false,error:"password should be 8 charachter long"}
    return {ok:true}
}

export default validateForm