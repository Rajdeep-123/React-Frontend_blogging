import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { read } from "./userApiHelp";
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DefaultAvatar from "../../images/avatar.jpg";
import DeleteUser from "./DeleteUser";
import FollowBtn from "./FollowBtn";
import Profiletabs from "./Profiletabs";
import { getPostByUser } from "../Posts/PostApi";





export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {following:[],followers:[]},
      redirectToSignIn: false,
      following:false,
      error:"",
      posts:[]
    };
  }

checkFollow = (user) =>{
  const jwt = isAuthenticated();
  const match = user.followers.find(follower=>{
    return follower._id===jwt.user._id;
  })
  return match;

}

clickFollowButton = followAPIreq =>{
  const loggedInUserId = isAuthenticated().user._id; // id of the loggded in user
  const token = isAuthenticated().token;
  const onPageUserId = this.state.user._id; //user id of the page user page where logged in user is there

  followAPIreq(loggedInUserId,token,onPageUserId)
  .then(data=>{
    if(data.error){
      this.setState({error:data.error})
    }else{
      this.setState({user:data,following:!this.state.following})
    }
  })
}

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token)
      .then((data) => {
        if(data.error){
          this.setState({ redirectToSignIn: true });
        }else{
          let following = this.checkFollow(data);
          this.setState({user:data,following})
          this.loadPosts(userId,token);
        }
      })
      .catch((err) => {
        return console.log(err);
      });
  };

  loadPosts = (userId,token)=>{
    getPostByUser(userId,token)
    .then(data=>{
      if(data.error){
        console.log(data.error);
      }else{
        this.setState({posts:data})
      }
    }).catch(err=>console.log(err))
  }
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props){
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignIn, user,posts } = this.state;

    if (redirectToSignIn) return <Redirect to="/signin" />;
    const profileUrl = user._id?`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`
        :DefaultAvatar;

    return (
      <div>
        <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
          <div className="row">
            <div className="col-md-4">


            <img
                style={{height:"200px",width:"100%",objectFit:"cover"}}
                className="img-thumbnail"
                src={profileUrl}
                onError={i=>(i.target.src=`${DefaultAvatar}`)}
                alt={user.name} />

            </div>
            <div className="col-md-8">
            <div className="lead mt-2">
              <p>{`Hello,${
              user.name
              }`}</p>
              <p>{`Email: ${user.email}`}</p>
              <p>{`Joined: ${new Date(user.created).toDateString()}`}</p>
              </div>
              {isAuthenticated().user &&
                isAuthenticated().user._id === user._id ? (
                  <div className="d-inline-block">
                  <Link style={{textDecoration:"none"}} to="/post/new">
                  <Button
                      variant="contained"
                      color="primary"
                      style={{backgroundColor:"green"}}
                      className="mr-5"
                      size="small"
                      startIcon={<AddIcon />}
                    >Create Post</Button></Link>
                  <DeleteUser userId={user._id}/>
                   <Link style={{textDecoration:"none"}} to={`/user/edit/${user._id}`}> <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    </Link>
                  </div>
                ):(
                  <FollowBtn
                  following = {this.state.following}
                  clickButton = {this.clickFollowButton}
                  />

                )}

                <div>
    {isAuthenticated().user &&
        isAuthenticated().user.role === "admin" && (
            <div class="card mt-5">
                <div className="card-body">
                    <h5 className="card-title">
                        Admin
                    </h5>
                    <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                    </p>
                    <Link
                        className="btn btn-raised btn-success mr-5"
                        to={`/user/edit/${user._id}`}
                    >
                        Edit Profile
                    </Link>
                    <DeleteUser userId={user._id} />
                </div>
            </div>
        )}
</div>

            </div>
          </div>


          <div className="row">
                  <div className="col-md-12">
                  <hr />
                  <p className="lead">{user.about}
                  </p>
                  <hr />
                  </div>
          </div>
          <Profiletabs
          following = {user.following}
           followers={user.followers}
           posts = {posts}
            />
        </div>
      </div>
    );
  }
}
