import React, { Component } from 'react';
import { isAuthenticated } from "../../auth";
import { Redirect } from 'react-router-dom';
import DefaultAvatar from "../../images/avatar.jpg";
import { create } from './PostApi';

export default class Createpost extends Component {
    constructor(){
        super();
        this.state={
           title:"",
           body:"",
            photo:"",
            error:"",
            user:{},
            fileSize:0,
            isLoading:false,
            redirectToProfile:false
        }
    }

      componentDidMount() {
          this.postData = new FormData();
            this.setState({user:isAuthenticated().user}) // get the user info from local stoarge once the component mountes
      }

    validation=()=>{
        const {title,body,fileSize} = this.state;
        if(fileSize>=1000000){
            this.setState({error:"Image must be less than 1 MB!",isLoading:false});
            return false;
        }
        if(!title||!body){
            this.setState({error:"All fields are required!",isLoading:false});
            return false;
        }
        return true;
    }

      handleChange=(name)=>event=>{  //function which returns a function
        this.setState({error:""})
        const value = name==="photo"?event.target.files[0]:event.target.value;
        const imageSize = name==="photo"?event.target.files[0].size:0;
        this.postData.set(name,value)
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
        const userId = isAuthenticated().user._id;


    create(userId,token,this.postData).then(data=>{
        if(data.error){
            this.setState({error:data.error})
        }else{

                this.setState({
                    title:"",
                    body:"",
                    photo:"",
                    isLoading:false,
                    redirectToProfile:true

                })


        }
    }).catch(err=>console.log(err));
    }
}



 newPost = (title,body)=>(
    <form>
     <div className="form-group">
    <label className="text-muted">Post Image</label>
    <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control"></input>
    </div>
    <div className="form-group">
    <label className="text-muted">Title</label>
    <input onChange={this.handleChange("title")} value={title} type="text" className="form-control"></input>
    </div>

    <div className="form-group">
    <label className="text-muted">Body</label>
    <textarea onChange={this.handleChange("body")} value={body} type="text" className="form-control"></textarea>
    </div>



    <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Create a post</button>

    </form>
 )


    render() {
        const {user,title,body,redirectToProfile,error,isLoading} = this.state;
        if(redirectToProfile) {
            return <Redirect to={`/user/${user._id}`}/>
        }


        return (
            <div>
            <div className="container">
            <h2 className="mt-5 mb-5">Post</h2>
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

            {this.newPost(title,body)}
            </div>

            </div>
        )
    }
}
