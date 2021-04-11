import React from 'react';
import {Route,Switch} from "react-router-dom";
import Home from './Core/Home';
import Navigation from './Core/Navigation';
import Editprofile from './Core/User/Editprofile';
import Profile from './Core/User/Profile';
import Signin from './Core/User/Signin';
import Signup from './Core/User/Signup';
import Users from './Core/User/Users';
import PrivateRoute from "./auth/PrivateRoute";
import FindPeople from "./Core/User/FindPeople";
import Createpost from './Core/Posts/Createpost';
import Dediactedpost from './Core/Posts/Dediactedpost';
import Updatepost from './Core/Posts/Updatepost';
import ForgotPassword from "./Core/User/ForgotPassword"
import ResetPassword from "./Core/User/ResetPassword"
import Admin from './admin/Admin';

const Mainrouter = () => {
    return (
        <div>
        <Navigation />
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword}/>

        <PrivateRoute exact path="/user/edit/:userId" component={Editprofile} />
        <PrivateRoute exact path="/findpeople" component={FindPeople} />
        <PrivateRoute exact path="/user/:userId" component={Profile} />
        <Route exact path="/users" component={Users} />
        <PrivateRoute exact path="/post/new" component={Createpost} />
        <Route exact path="/post/:postId" component={Dediactedpost} />
        <PrivateRoute exact path="/post/edit/:postId" component={Updatepost} />
        <PrivateRoute exact path="/admin" component={Admin} />


    </Switch>
        </div>
    )
}

export default Mainrouter
