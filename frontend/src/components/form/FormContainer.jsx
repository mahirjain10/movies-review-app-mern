const FormContainer=({className,children,...rest})=>{
    return(
        <div className="flex justify-center items-center h-full ">
            <form className={`bg-white drop-shadow flex flex-col items-center overflow-hidden rounded dark:bg-secondary ${className}`} {...rest}>
            {children}
            </form>
            </div>
    )
}

export default FormContainer