import React, { Component } from "react";
import Allposts from "../Core/Posts/Allposts";
import Users from "../Core/User/Users";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getAdminData, pushUser } from "./adminApi";
import { removeUser } from "./adminApi";
import "./admin.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      redirectToHome: false,
      adminSchema: [],
      allowMsg:"",
      allow:false,
      declineMsg:"",
      decline:false
    };
  }

  componentDidMount() {
    if (isAuthenticated().user.role !== "admin") {
      this.setState({ redirectToHome: true });

    }
    const token = isAuthenticated().token;
    getAdminData(token)
      .then((data) => {
        this.setState({ adminSchema: data.clientRequestsToAdmin.reverse() });
      })
      .catch((err) => console.log(err));
  }


  renderClients = () => {
   return  this.state.adminSchema.map((client, index) => (
      <div  key={index}>
        <p className="alert alert-info">
          <span className="lead">{client.name}</span> wants to become a member
          <p className="text-muted">{client.email}</p>
          <p className="text-muted">On {new Date(client.time).toString()}</p>

          <i
            title="allow"
            onClick={()=>this.allowClient(client.name,client.email,client.password,index)}
            className="fa fa-check float-right alert-success hoverEffect"
            aria-hidden="true"
          ></i>

          <i
           title="decline"
            onClick={()=>this.removeClient(client._id,client.name,index)}
            className="fa fa-times alert-danger float-right mr-5 hoverEffect"
            aria-hidden="true"
          ></i>

        </p>

      </div>
    ));
  }

  allowClient = (name,email,password,index) =>{
    const token = isAuthenticated().token;

    let confirm = window.confirm(`Are you sure you want to accept ${name}?`);
    if(confirm){

    pushUser(name,email,password,token)
    .then(data=>{
      let users =this.state.adminSchema;
        users.splice(index,1);
      this.setState({
        adminSchema:users,
        allowMsg:`${name} has now become memeber!`,
        decline:false,
        allow:true

      })
      toast.success(`${this.state.allowMsg}`)
    })
    .catch(err=>console.log(err))
  }
  }



  removeClient = (id,name,index) =>{
    const token = isAuthenticated().token;
    let confirm = window.confirm(`Are you sure you want to decline ${name}?`);
    if(confirm){
    removeUser(id,token)
    .then(data=>{
      let users =this.state.adminSchema;
        users.splice(index,1);
      this.setState({
        adminSchema:users,
        declineMsg:`${name} has been declined from the request list!`,
        allow:false,
        decline:true,

      })
      toast.error(`${this.state.declineMsg}`)

    })
    .catch(err=>console.log(err))
  }



}

  render() {
    const {redirectToHome,adminSchema} = this.state;
    if (redirectToHome) {
      return <Redirect to="/" />;
    }



    return (
      <div>
      <h4 className="m-3">User requests ({adminSchema.length})</h4>
      <ToastContainer
        position="bottom-left"
      />

         <div className="row justify-content-md-center">
         <div className="col-md-11 mt-3 nortificationArea pt-3">
         {adminSchema.length===0?(
           <>
           <h3 className="text-center">No user requests</h3>
           </>
           ): this.renderClients()}
         </div>
         </div>


        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">

              <hr />
              <Allposts />
            </div>
            <div className="col-md-6">

              <hr />
              <Users />
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default Admin;
