const Container=({children})=>{
    return(
        <div className="h-screen fixed inset-0 bg-white dark:bg-primary  ">
            {children}
        </div>
    )
}

export default Container