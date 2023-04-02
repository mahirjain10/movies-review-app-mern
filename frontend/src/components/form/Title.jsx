const Title=({children,className})=>{
    return(
        <div className={`text-black font-poppins mt-5 dark:text-white ${className}`}>
            {children}
        </div>
    )
}
export default Title