const ErrorLine=({children})=>{
    return(
        // <div className="font-poppins text-red text-base pl-[3px] font-extrabold mt-[2px] w-[269px]">name length should be 3 to 20 charachters</div>
        <div className="font-poppins text-red text-base pl-[3px] font-extrabold mt-[2px] w-[269px]">{children}</div>
    )
}

export default ErrorLine