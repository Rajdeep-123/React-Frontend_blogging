import React, { Component } from 'react';
import { read,updateUserInfo } from "./userApiHelp";
import { isAuthenticated, updateUserLocal } from "../../auth";
import { Redirect } from 'react-router';
import DefaultAvatar from "../../images/avatar.jpg";

export default class Editprofile extends Component {
    constructor(){
        super();
        this.state={
            id:"",
            name:"",
            email:"",
            password:"",
            redirectToProfile:false,
            error:"",
            isLoading:false,
            fileSize:0,
            about:""
        }
    }
    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
          .then((data) => {
            if(data.error){
                console.log(data.error);
            }else{
            return this.setState({
              id:data._id,
              name:data.name,
              email:data.email,
             error:"",
              about:data.about

            });
        }
          })
          .catch((err) => {
            return console.log(err);
          });

      };
      componentDidMount() {
          this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
      }

    validation=()=>{
        const {name,email,password,fileSize} = this.state;
        if(fileSize>=1000000){
            this.setState({error:"Image must be less than 1 MB!",isLoading:false});
            return false;
        }
        if(!name){
            this.setState({error:"Name is required!",isLoading:false});
            return false;
        }
        if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            this.setState({error:"A valid email address is required!",isLoading:false});
            return false;
        }
        if(password.length>=1 && password.length<=5){
            this.setState({error:"Password must be at least 6 characters long!",isLoading:false});
            return false;
        }
        return true;
    }

      handleChange=(name)=>event=>{  //function which returns a function
        this.setState({error:""})
        const value = name==="photo"?event.target.files[0]:event.target.value;
        const imageSize = name==="photo"?event.target.files[0].size:0;
        this.userData.set(name,value)
        this.setState({
            [name]:value,
            fileSize:imageSize
        })
 }

handleSubmit=(e)=>{
    e.preventDefault();
    this.setState({isLoading:true})

    if(this.validation()){
        const token = isAuthenticated().token;
    const {id} = this.state;


    updateUserInfo(id,this.userData,token).then(data=>{
        if(data.error){
            this.setState({error:data.error})
        }else if (isAuthenticated().user.role === "admin") {
            this.setState({
                redirectToProfile: true
            });
        }

        else{
            updateUserLocal(data,()=>{
                this.setState({redirectToProfile:true})
            })

        }
    }).catch(err=>console.log(err));
    }
}



 editProfileForm = (name,email,password,about)=>(
    <form>
     <div className="form-group">
    <label className="text-muted">Profile</label>
    <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control"></input>
    </div>
    <div className="form-group">
    <label className="text-muted">Name</label>
    <input onChange={this.handleChange("name")} value={name} type="text" className="form-control"></input>
    </div>

    <div className="form-group">
    <label className="text-muted">Email</label>
    <input  onChange={this.handleChange("email")} value={email} type="email" className="form-control"></input>
    </div>

    <div className="form-group">
    <label className="text-muted">About</label>
    <textarea onChange={this.handleChange("about")} value={about} type="text" className="form-control"></textarea >
    </div>

    <div className="form-group">
    <label className="text-muted">Password</label>
    <input  onChange={this.handleChange("password")} value={password} type="password" className="form-control"></input>
    </div>

    <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Update</button>

    </form>
 )


    render() {
        const {name,email,id,password,redirectToProfile,error,isLoading,about} = this.state;
        if(redirectToProfile) return <Redirect to={`/user/${id}`}/>

        const profileUrl = id?`${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`
        :DefaultAvatar;

        return (
            <div>
            <div className="container">
            <h2 className="mt-5 mb-5">Edit</h2>
            <div className="alert alert-danger" style={{display:error?"":"none"}}>
            {error}
        </div>
        {isLoading ? (
                    <div className="jumbotron text-center">
                    <h2>Loading...</h2>
                    </div>
                ):(
                    ""
                )}
                <img
                 style={{height:"200px",width:"30%",objectFit:"cover"}}
                className="img-thumbnail"
                src={profileUrl}
                onError={i=>(i.target.src=`${DefaultAvatar}`)}
                 alt={name} />
            {this.editProfileForm(name,email,password,about)}
            </div>

            </div>
        )
    }
}
