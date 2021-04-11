import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {signUp} from "../../auth/index"

 class Signup extends Component {
     constructor(){
         super();

         this.state={
            name:"",
            email:"",
            password:"",
            err:"",
            isDone:false

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
         const {name,email,password}= this.state;
         const userInfo={
             name,email,password
         }
       signUp(userInfo)
       .then(data => {
           if(data.error){
               this.setState({err:data.error})
           }else{
               this.setState({
                   name:"",
                   email:"",
                   password:"",
                   err:"",
                   isDone:true
               })
           }
       })
     }



     signUpForm = (name,email,password)=>(
        <form>
        <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={this.handleChange("name")} value={name} type="text" className="form-control"></input>
        </div>

        <div className="form-group">
        <label className="text-muted">Email</label>
        <input  onChange={this.handleChange("email")} value={email} type="email" className="form-control"></input>
        </div>

        <div className="form-group">
        <label className="text-muted">Password</label>
        <input  onChange={this.handleChange("password")} value={password} type="password" className="form-control"></input>
        </div>

        <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Submit</button>

        </form>
     )


    render() {
        const {name,email,password,err,isDone} = this.state;
        return (
            <div className="container">
            <h2 className="mt-5 mb-5">Signup</h2>
            <div className="alert alert-danger" style={{display:err?"":"none"}}>
            {err}
        </div>
        <div className="alert alert-info" style={{display:isDone?"":"none"}}>
            New account is created succesfully! Please <Link to="/signin">Sign in</Link>
        </div>
        {this.signUpForm(name,email,password)}
            </div>
        )
    }
}

export default Signup;
