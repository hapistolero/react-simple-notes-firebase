import React, { Component, useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import {  loginUserApi } from "../../../config/redux/action";
import { useNavigate } from "react-router-dom";
function Login(props) {
    

    const navigate = useNavigate()

    const [data, setData] = useState({
        email: '',
        password: '',
        status:'',
        
    })
   

   const handleChangeText= (e)=>{

        setData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
          }))
        

    }

    const handleLoginSubmit = async () =>{
        const {email, password} = data
       
       
        const res = await props.loginAPI({email,password})
        console.log()
        if(res){
            alert('login success')

            localStorage.setItem('userData',JSON.stringify(res))
            navigate('/')

            
            
        }else{
            alert('login fail')
        }
    }

  
        return(
            <div className="div-login">
                <p>Login Page</p>
                <input placeholder="Email" id='email' type="text" onChange={handleChangeText}/>
                <input placeholder="Password" id='password' type="password" onChange={handleChangeText}/>
                <div >
                {/* <button onClick={this.handleRegisterSubmit} className="btn-login">Register</button>
                 */}
                {/* <button className="btn-login">Dashboard</button>
                 */}
                 <Button className='btn-login'  onClick={handleLoginSubmit} title={'login'} loading={props.isLoading}></Button>
                 <p>{props.status}</p>
                </div>
               
            </div>
        )
    
}

const reduxState = (state) =>({
    isLoading: state.isLoading,
    status:state.status
})

const reduxDispatch = (dispatch) =>({
    loginAPI: (data) => dispatch(loginUserApi(data))
})



export default connect(reduxState,reduxDispatch)(Login)