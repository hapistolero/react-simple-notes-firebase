import React from "react"
const Button = ({className,title,onClick,loading}) =>{
    if(loading){
        return( <p  onClick={onClick}>loading...</p>
    )
    }
    return (
        <button className={className} onClick={onClick} >{title}</button>
    )
}

export default Button