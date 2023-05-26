const FormContainer=({className,children,...rest})=>{
    return(
        <div className="flex justify-center items-center">
            <form className={`bg-white drop-shadow flex flex-col items-center rounded dark:bg-secondary ${className}`} {...rest}>
            {children}
            </form>
            </div>
    )
}

export default FormContainer