const Button=({children,className})=>{
    return (
        <button className={` font-poppins text-white bg-black text-xl text-center w-[269px] h-11 rounded-sm font-semibold dark:text-black dark:bg-white ${className}`} >{children}</button>
    )
}

export default Button