import React, { Component } from "react";
import { dedicatedPost, deletePost, like, unLike } from "./PostApi";
import Comment from "./Comment"
import PostAvatar from "../../images/post.webp";
import { Link, Redirect } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { isAuthenticated } from "../../auth";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';


export default class Dediactedpost extends Component {
  state = {
    post: "",
    redirect: false,
    error: "",
    message: "",
    isLoaded: false,
    like: false,
    likes: 0,
    redirecttoLogin:false,
    comments:[]
  };
  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    dedicatedPost(postId)
      .then((data) => {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
          comments:data.comments.reverse()
        });
      })
      .catch((err) => console.log(err));
  };

  updateComments = comments =>{
    this.setState({comments:comments.reverse()})
  }

  checkLike = (likes) => {
    const userId = isAuthenticated()&&isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1; // returns -1 if the userId is not found, and this returns false
    return match;
  };

  likeToggle = () => {
      if(!isAuthenticated()){
          this.setState({redirecttoLogin:true})
          return false;
      }
    let likeApiCall = this.state.like ? unLike : like;
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.state.post._id;

    likeApiCall(userId, token, postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length,
        });
      }
    });
  };

  removePost = (postId) => {
    const token = isAuthenticated().token;
    let confirm = window.confirm("Are you sure you want to delete the post?");
    if (confirm) {
      deletePost(postId, token)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            this.setState({ err: data.error });
          } else {
            this.setState({ message: data, redirect: true, isLoaded: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  postbody = (post) => {
    const posterId = post.created ? `/user/${post.postedBy._id}` : "";
    const posterName = post.created ? post.postedBy.name : " Unknown";
    const { like, likes } = this.state;
    return (
      <>
        <div class="card-body">
          <img
            className="img-thumbnail"
            style={{ height: "350px", width: "100%", objectFit: "cover" }}
            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
            onError={(i) => (i.target.src = `${PostAvatar}`)}
            alt="post Image"
          />
          {like ? (
            <>
              <IconButton onClick={this.likeToggle}>
                <ThumbUpAltIcon style={{color:"#0066ff"}} />
              </IconButton>
              {likes} Like
            </>
          ) : (
            <>
              <IconButton onClick={this.likeToggle}>
               <ThumbUpAltOutlinedIcon />
              </IconButton>
              {likes} Like
            </>
          )}

          <p class="card-text">{post.body}...</p>
          <br />
          <p className="font-italic mark">
            Posted by <Link to={posterId}>{posterName}</Link> on{" "}
            {new Date(post.created).toDateString()}
          </p>
          <Link to={`/`} class="btn btn-sm btn-primary btn-raised">
            Back to posts
          </Link>

          {(isAuthenticated().user &&
            isAuthenticated().user._id === post.postedBy._id) && (
              <>
                <div className="float-right">
                  <Link
                    to={`/post/edit/${post._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      className="mr-5"
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: "orange" }}
                      size="small"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => this.removePost(post._id)}
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
            <div>
    {isAuthenticated().user &&
        isAuthenticated().user.role === "admin" && (
            <div class="card mt-5">
                <div className="card-body">
                    <h5 className="card-title">Admin</h5>
                    <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                    </p>
                    <Link
                        to={`/post/edit/${post._id}`}
                        className="btn btn-raised btn-warning btn-sm mr-5"
                    >
                        Update Post
                    </Link>
                    <button
                        onClick={() => this.removePost(post._id)}
                        className="btn btn-raised btn-danger"
                    >
                        Delete Post
                    </button>
                </div>
            </div>
        )}
</div>
        </div>
      </>
    );
  };

  render() {
    const { post, redirect, error, message, isLoaded, redirecttoLogin,comments } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    if(redirecttoLogin){
        return <Redirect to="/signin" />;
    }

    return (
      <div>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <div
          className="alert alert-info"
          style={{ display: isLoaded ? "" : "none" }}
        >
          {message}
        </div>
        <div className="container">
          <h4 className="display-2 mt-3 mb-3">{post.title}</h4>
          {!post ? (
            <div className="jumbotron text-center">
              <h2>Loading...</h2>
            </div>
          ) : (
            this.postbody(post)
          )}
          <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments}/>
        </div>

      </div>
    );
  }
}
