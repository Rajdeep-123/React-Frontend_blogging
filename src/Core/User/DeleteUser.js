import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated, signOut } from '../../auth';
import {removeUser} from "./userApiHelp";

export default class DeleteUser extends Component {
  state ={
    redirect:false
  }

  deleteUser=()=>{

      const userId = this.props.userId;
      const token = isAuthenticated().token;


      removeUser(userId,token)
      .then(removedUser=>{

        console.log(removedUser);



          signOut(()=>console.log("Deleted succesfully"));
          this.setState({redirect:true});



      })


  }

  deleteConfirm = ()=>{
    let confirm = window.confirm("Are you sure you want to delete your account?");
    let postConfirm = window.confirm("All the posts associated with this accounts will be deleted")
    if(confirm && postConfirm){
      this.deleteUser()
    }
  }
    render() {

      if(this.state.redirect){
       return <Redirect to="/" />
      }
        return (
            <>
               <Button className="mr-5"
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={this.deleteConfirm}
                    >
                      Delete
                    </Button>
            </>
        )
    }
}
