const Container=({children})=>{
    console.log(window.innerHeight)
    return(
        <div className="relative top-[54px] flex item-center justify-center bg-white h-[600px] w-full dark:bg-primary">
            {children}
        </div>
    )
}

export default Container