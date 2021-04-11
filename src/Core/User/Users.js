import React, { Component } from 'react';
import {list} from "./userApiHelp";
import DefaultAvatar from "../../images/avatar.jpg";
import { Link } from 'react-router-dom';


export default class Users extends Component {
    constructor(){
        super();
        this.state={
            users:[]
        }
    }


    componentDidMount(){

        list().then(data=>{
             return(

            this.setState({
                users:data
            })
             )}

         )
         .catch(err=>console.log(err))


    }




renderUsers=users =>(
        <div className="row">
        {users.map((user,index)=>
            (
            <div className="col-md-4">
<div class="card mb-4" >
<img
                className="card-img-top img-thumbnail"
                style={{height:"250px", width:"100%", objectFit:"cover"}}
                src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                onError={i=>(i.target.src=`${DefaultAvatar}`)}
                 alt={user.name}/>

  <div class="card-body">
    <h5 class="card-title">{user.name}</h5>
    <p class="card-text">{user.email}</p>
    <Link to={`/user/${user._id}`} class="btn btn-sm btn-primary btn-raised">View Profile</Link>
  </div>
</div>
</div>
            )
        )}
        </div>
    )

    render() {
        const {users} = this.state;
        return (
            <div className="container">
         <h2 className="mt-5 mb-5">Users</h2>
            {this.renderUsers(users)}
            </div>
        )
    }
}
