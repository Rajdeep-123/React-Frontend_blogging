import React, { Component } from "react";
import Allposts from "../Core/Posts/Allposts";
import Users from "../Core/User/Users";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class Admin extends Component {
    state = {
        redirectToHome: false
    };


    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }
    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <div className="jumbotron">
                    <h2>Admin Dashboard</h2>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <Allposts />
                        </div>
                        <div className="col-md-6">
                            <Users />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;
