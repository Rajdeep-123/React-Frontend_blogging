import React, { Component } from 'react';
import {findPeople, follow} from "./userApiHelp";
import DefaultAvatar from "../../images/avatar.jpg";
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../auth";


export default class FindPeople extends Component {
    constructor(){
        super();
        this.state={
            users:[],
            error:"",
            followStatus:false,
            followMessage:""

        }
    }


    componentDidMount(){
        let userId = isAuthenticated().user._id;
        let token = isAuthenticated().token;
        findPeople(userId,token).then(data=>{
             return(

            this.setState({
                users:data
            })
             )}

         )
         .catch(err=>console.log(err))


    }


handleFollow =(user,index) =>{
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId,token,user._id)
    .then(data =>{
        if(data.error){
            this.setState({error:data.error})
        }else{
            let toFollowing =this.state.users;
            toFollowing.splice(index,1); // remove the selected user from the follow list
            this.setState({
                users:toFollowing,
                open:true,
                followMessage:`You now have started following ${user.name}`
            })
        }
    })
}

renderUsers=users =>(
        <div className="row">
        {users.map((user,index)=>
            (
                <div className="col-md-4">
<div class="card mb-4" >
<img
                style={{height:"250px",width:"100%", objectFit:"cover"}}
                className="img-thumbnail"
                src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                onError={i=>(i.target.src=`${DefaultAvatar}`)}
                 alt={user.name}/>

  <div class="card-body">
    <h5 class="card-title">{user.name}</h5>
    <p class="card-text">{user.email}</p>
    <Link to={`/user/${user._id}`} class="btn btn-sm btn-primary btn-raised">View Profile</Link>
    <button className="btn btn-raised btn-success btn-sm float-right" onClick={()=> this.handleFollow(user,index)}>Follow</button>
  </div>
</div>
</div>
            )
        )}
        </div>
    )

    render() {
        const {users,open,followMessage} = this.state;
        return (
            <div className="container">
         <h2 className="mt-5 mb-5">Find People</h2>
         {open&&(
             <div className="alert alert-success">
             <p>{followMessage}</p>
             </div>
         )}
            {this.renderUsers(users)}
            </div>
        )
    }
}
