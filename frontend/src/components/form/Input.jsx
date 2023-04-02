import { forwardRef } from "react"
const Input=forwardRef(({className,...rest},ref)=>{
    return (
        <input className={`font-poppins bg-white text-black border-black border-solid border-[1px] rounded-[4px] h-11 focus:outline-none focus:border-[2px] ${className}  dark:bg-black dark:border-white dark:text-white dark:font-poppins`} ref={ref}{...rest}/>
    )
})

export default Input