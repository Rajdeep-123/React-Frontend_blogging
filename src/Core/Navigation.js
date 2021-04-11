import React from "react";
import { Link,withRouter } from "react-router-dom";
import { signOut,isAuthenticated} from "../auth/index"


 const activeLink = (history,path)=>{
  if(history.location.pathname === path) {
    return {color:"#ff9900"}
  }else{
    return {color:"#ffffff"}
  }
}




const Navigation = ({history}) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary color">

        <li className="nav-item">
          <Link className="nav-link" style={activeLink(history,"/")} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={activeLink(history,"/users")} to="/users">Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={activeLink(history,"/post/new")} to="/post/new">Create Post</Link>
        </li>
        {!isAuthenticated()&&(
          <>
          <li className="nav-item">
          <Link className="nav-link" style={activeLink(history,"/signin")} to="/signin">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={activeLink(history,"/signup")} to="/signup">Register</Link>
        </li>
          </>
        )}
       {isAuthenticated()&&(
         <>
        <li className="nav-item">

          <Link  className="nav-link" style={activeLink(history,`/user/${isAuthenticated().user._id}`)} to={`/user/${isAuthenticated().user._id}`}>
          {`${isAuthenticated().user.name}'s profile`}</Link>
          </li>
          <li className="nav-item">
          <Link  className="nav-link" style={activeLink(history,`/findpeople`)} to={"/findpeople"}>
          Find People</Link>
          </li>
          <li className="nav-item">
          <span className="nav-link" style={activeLink(history,"/signup"),{cursor:"pointer",color:"#ffffff"}}
          onClick={()=>signOut(()=>history.push("/"))}>Logout</span>
        </li>
         </>
       )}

       {isAuthenticated() && isAuthenticated().user.role === "admin" && (
    <li className="nav-item">
        <Link
            to={`/admin`}
            style={activeLink(history, `/admin`)}
            className="nav-link"
        >
            Admin
        </Link>
    </li>
)}



      </ul>

    </div>
  );


};










export default withRouter(Navigation);
