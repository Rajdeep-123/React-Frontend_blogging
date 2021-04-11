import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth'
import { postComment, removeComment } from './PostApi'
import DefaultAvatar from "../../images/avatar.jpg";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { IconButton } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

export default class Comment extends Component {
    state={
        text:"",
        err:"",
        checkVal:false
    }
    validation =()=>{
        const commentText = this.state.text;
        if(!commentText){

            this.setState({err:"Cannot post a blank commnet!",checkVal:true})
            return false
        }
        if(commentText.length>=150){
            this.setState({err:"Mamimum size of comment must be 150 words!",checkVal:true})
            return false
        }
        if(!isAuthenticated()){
            this.setState({err:"Please login to comment!",checkVal:true})
            return false
        }

        return true
    }
    handleChange= event =>{
            this.setState({text:event.target.value,checkVal:false,err:""})
    }
    postComment=e=>{
        e.preventDefault();

        if(this.validation()){
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;
        const comment = {text:this.state.text}

        postComment(userId,token,postId,comment)
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                this.setState({text:""})
                this.props.updateComments(data.comments)
            }
        })}
    }

    removeComment = (comment) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        let confirm = window.confirm("Are you sure you want to delete the comment?");
        if (confirm) {
          removeComment(userId,token,postId,comment)
            .then((data) => {
              if (data.error) {
                console.log(data.error);
                this.setState({ err: data.error });
              } else {
                console.log(data);
                this.props.updateComments(data.comments)
              }
            })
            .catch((err) => console.log(err));
        }
      };

    render() {
        const{comments} = this.props;
        const{checkVal,err}= this.state;
        return (
            <div>



            <div className="alert alert-danger" style={{display:checkVal?"":"none"}}>
            {err}
        </div>


        <form onSubmit={this.postComment}>
     <div className="form-group">
     <div className="row">
     <div className="col-md-11">

    <input  onChange={this.handleChange} placeholder="Leave a comment" type="text" value={this.state.text} className="form-control"></input>

    </div>
    <div className="col-md-1">
    <IconButton type="submit"><AddCircleOutlineOutlinedIcon fontSize="large"

    /></IconButton>
    </div>
    </div>
    </div>
    </form>

    <div className="col-md-12">
                <h3 className="text-primary"><span style={{fontSize:"18px"}}>{comments.length}</span> Comments</h3>
                <hr />
                {comments.map((comment,index)=>(
                     <div key={index}>
                     <div>
                     <div>

                        <Link style={{textDecoration:"none"}} to={`/user/${comment.postedBy._id}`}>
                    <img className="float-left mr-2"
                    onError={i=>(i.target.src=`${DefaultAvatar}`)}
                    height="40px"
                    width="40px"
                    style={{border: "1px solid black", borderRadius: "50%"}}
                     src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`} />
                     </Link>
                   <p className="lead" style={{fontSize:"1rem"}}>{comment.text}</p>

                        </div>
                        </div>
                        <p style ={{clear:"both"}}></p>
                        <p className="font-italic mark">
            Posted by <Link to={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}</Link> on{" "}
            {new Date(comment.created).toDateString()}
            <span>
            {isAuthenticated().user &&
            isAuthenticated().user._id === comment.postedBy._id && (
              <>
                <div className="float-right">

                <IconButton size="small" onClick={() => this.removeComment(comment)}>
                    <DeleteIcon style={{color:"#ff4d4d"}} />
                    </IconButton>

                </div>
              </>
            )}
            </span>
          </p>
                    </div>
                ))}
            </div>


            </div>
        )
    }
}
