import React, { Component } from "react";
import firebase from "../../../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import './register.css'
import Button from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { registerUserApi } from "../../../config/redux/action";

class Register extends Component {

    state ={
        email: '',
        password: '',
        status:'',
        
    }

    handleChangeText= (e)=>{

        this.setState({
            [e.target.id]: e.target.value
        })
        

    }

    handleRegisterSubmit = () =>{
        const {email, password} = this.state
       
        this.props.registerApi({email,password})
        console.log(firebase)
       
    }

    render() {
        return(
            <div className="div-login">
                <p>Register Page</p>
                <input placeholder="Email" id='email' type="text" onChange={this.handleChangeText}/>
                <input placeholder="Password" id='password' type="password" onChange={this.handleChangeText}/>
                <div >
                {/* <button onClick={this.handleRegisterSubmit} className="btn-login">Register</button>
                 */}
                {/* <button className="btn-login">Dashboard</button>
                 */}
                 <Button className='btn-login'  onClick={this.handleRegisterSubmit} title={'register'} loading={this.props.isLoading}></Button>
                 <p>{this.props.status}</p>
                </div>
               
            </div>
        )
    }
}

const reduxState = (state) =>({
    isLoading: state.isLoading,
    status:state.status
})

const reduxDispatch = (dispatch) =>({
    registerApi: (data) => dispatch(registerUserApi(data))
})

export default connect(reduxState,reduxDispatch)(Register) 