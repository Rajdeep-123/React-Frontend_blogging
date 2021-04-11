import React, { Component } from 'react';
import {follow,unfollow} from "./userApiHelp"

export default class FollowBtn extends Component {
    handleClickFollow=()=>{
        this.props.clickButton(follow)
    }
    handleClickUnFollow=()=>{
      this.props.clickButton(unfollow)
    }
    render() {
        return (
            <>
              <div className="d-inline-block">
            {
                (!this.props.following)?(
                    <div onClick={this.handleClickFollow} className="btn btn-success btn-raised m-1">
                Follow
              </div>
                ):(
                    <div onClick={this.handleClickUnFollow} className="btn btn-warning btn-raised m-1">
                UnFollow
              </div>
                )
            }



              </div>
            </>
        )
    }
}
