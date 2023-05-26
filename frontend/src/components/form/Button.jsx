const Button=({children,className,...rest})=>{
    console.log({...rest})
    return (
        <button className={` font-poppins text-white bg-black text-xl text-center w-[269px] h-11 rounded-sm font-semibold dark:text-black dark:bg-white ${className}`} {...rest}>{children}</button>
    )
}

export default Button