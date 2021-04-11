import React, { Component } from 'react';
import { dedicatedPost,updatePostInfo } from "./PostApi";
import { isAuthenticated } from "../../auth";
import { Redirect } from 'react-router';
import PostAvatar from "../../images/post.webp";

export default class Updatepost extends Component {
    constructor(){
        super();
        this.state={
            id:"",
            title:"",
            body:"",
           redirectToPost:false,
            error:"",
            isLoading:false,
            fileSize:0
        }
    }
    init = (postId) => {
        const token = isAuthenticated().token;
        dedicatedPost(postId, token)
          .then((data) => {
            if(data.error){
                console.log(data.error);
            }else{
            return this.setState({
              id:data._id,
              title:data.title,
              body:data.body,
              error:"",

            });
        }
          })
          .catch((err) => {
            return console.log(err);
          });
      };
      componentDidMount() {
          this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
      }

    validation=()=>{
        const {title,body,fileSize} = this.state;
        if(fileSize>=1000000){
            this.setState({error:"Image must be less than 1 MB!",isLoading:false});
            return false;
        }
        if(!title){
            this.setState({error:"Title is required!",isLoading:false});
            return false;
        }
        if(!body){
            this.setState({error:"Body is required!",isLoading:false});
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
        const postId = this.state.id;



    updatePostInfo(postId,token,this.postData).then(data=>{
        if(data.error){
            this.setState({error:data.error})
        }else{

                this.setState({
                    title:"",
                    body:"",
                    isLoading:false,
                     redirectToPost:true
                    })


        }
    }).catch(err=>console.log(err));
    }
}



editPostForm = (title,body)=>(
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
    <input  onChange={this.handleChange("body")} value={body} type="email" className="form-control"></input>
    </div>


    <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Update Post</button>

    </form>
 )


    render() {
        const {id,title,body,redirectToPost,error,isLoading} = this.state;
        if(redirectToPost) return <Redirect to={`/post/${id}`}/>

        const postPhotoUrl = id?`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`
        :PostAvatar;

        return (
            <div>
            <div className="container">
            <h2 className="mt-5 mb-5">Edit Post</h2>
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
                src={postPhotoUrl}
                onError={i=>(i.target.src=`${PostAvatar}`)}
                 alt="post image" />

       { this.editPostForm(title, body)}
            </div>

            </div>
        )
    }
}
