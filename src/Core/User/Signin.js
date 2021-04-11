import React, { Component } from 'react';
import {Link,Redirect} from "react-router-dom";
import {signin,authanticate} from "../../auth/index";

 class Signin extends Component {
     constructor(){
         super();

         this.state={

            email:"",
            password:"",
            err:"",
            redirect:false,
            isLoading:false


         }


        }
        handleChange=(name)=>event=>{  //function which returns a function
            this.setState({err:""})
            this.setState({
                [name]:event.target.value
            })
     }



     handleSubmit = event =>{
         event.preventDefault();
         this.setState({isLoading:true})
         const {email,password}= this.state;
         const userInfo={
             email,password
         }

         signin(userInfo)
       .then(data => {
           if(data.error){
               this.setState({err:data.error,isLoading:false})
           }else{
               authanticate(data,()=>{
                   this.setState({
                       redirect:true
                   })
               })
           }
       })
     }



     SigninForm = (email,password)=>(
         <>
        <form>


        <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={this.handleChange("email")} value={email} type="email" className="form-control"></input>
        </div>

        <div className="form-group">
        <label className="text-muted">Password</label>
        <input  onChange={this.handleChange("password")} value={password} type="password" className="form-control"></input>
        </div>

        <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Submit</button>

        </form>

        </>
     )


    render() {
        const {email,password,err,redirect,isLoading} = this.state;

        if(redirect){
           return <Redirect to="/" />
                }

        return (
            <div className="container">
            <h2 className="mt-5 mb-5">SignIn</h2>
            <div className="alert alert-danger" style={{display:err?"":"none"}}>
            {err}
        </div>

        {isLoading ? (
                    <div className="jumbotron text-center">
                    <h2>Loading...</h2>
                    </div>
                ):(
                    ""
                )}

        {this.SigninForm(email,password)}

   <Link to="/forgot-password" className="text-danger">
       {" "}
       Forgot Password?
   </Link>

            </div>
        )
    }
}

export default Signin;
