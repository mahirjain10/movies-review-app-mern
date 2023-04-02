import {Link} from "react-router-dom"
const FormNav=({children,to})=>{
    // console.log(to);
    return (<Link to={to}>
    <div className="font-poppins cursor-pointer text-lightBlack hover:text-secondary text-base dark:text-lightWhite  dark:hover:text-white">
      {children}
    </div>
    </Link>)
}

export default FormNav