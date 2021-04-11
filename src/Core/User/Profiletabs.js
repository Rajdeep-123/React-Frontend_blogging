import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DefaultAvatar from "../../images/avatar.jpg";
import PostAvatar from "../../images/post.webp";

export default class Profiletabs extends Component {
    render() {

            const {following,followers,posts} = this.props;
        return (
            <div>
            <div className="row">
            <div className="col-md-4">
                <h3 className="text-primary">Followers <span style={{fontSize:"18px"}}>{followers.length}</span></h3>
                <hr />
                {followers.map((userName,index)=>(
                     <div key={index}>

                     <div>
                        <Link style={{textDecoration:"none"}} to={`/user/${userName._id}`}>
                    <img className="float-left mr-2"
                    onError={i=>(i.target.src=`${DefaultAvatar}`)}
                    height="40px"
                    width="40px"
                    style={{border: "1px solid black", borderRadius: "50%"}}
                     src={`${process.env.REACT_APP_API_URL}/user/photo/${userName._id}`} />
                   <p className="lead">{userName.name}</p>
                        </Link>
                        </div>

                       <p style ={{clear:"both"}}></p>
                    </div>
                ))}
            </div>

            <div className="col-md-4">
                <h3 className="text-primary">Following <span style={{fontSize:"18px"}}>{following.length}</span></h3>
                <hr />
                {following.map((userName,index)=>(
                     <div key={index}>
                     <div>
                     <div>
                        <Link style={{textDecoration:"none"}} to={`/user/${userName._id}`}>
                    <img className="float-left mr-2"
                    onError={i=>(i.target.src=`${DefaultAvatar}`)}
                    height="40px"
                    width="40px"
                    style={{border: "1px solid black", borderRadius: "50%"}}
                     src={`${process.env.REACT_APP_API_URL}/user/photo/${userName._id}`} />
                   <p className="lead">{userName.name}</p>
                        </Link>
                        </div>
                        </div>
                        <p style ={{clear:"both"}}></p>
                    </div>
                ))}
            </div>
            <div className="col-md-4">
            <h3 className="text-primary">Posts</h3>
            <hr />
            {posts.map((post,index)=>(
                     <div key={index}>
                     <div>
                     <div>
                        <Link style={{textDecoration:"none"}} to={`/post/${post._id}`}>
                <img  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                style={{height:"35px", width:"35px",borderRadius:"5px"}}
                onError={i=>(i.target.src=`${PostAvatar}`)}
                 /> <span className="lead">{post.title}</span>

                        </Link>
                        </div>
                        </div>
                        <p style ={{clear:"both"}}></p>
                    </div>
                ))}
            </div>
            </div>
            </div>
        )
    }
}
