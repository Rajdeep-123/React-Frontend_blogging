import React, { Component } from "react";
import { list } from "./PostApi";
import PostAvatar from "../../images/post.webp";
import { Link } from "react-router-dom";
import "./main.css"
import AOS from 'aos';
AOS.init();

export default class Allposts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page:1,
      checkPostLength:0
    };
  }

  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  loadPosts = page => {
    list(page).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            this.setState({ posts: data });
        }
    });
};

loadMore = number => {
  this.setState({ page: this.state.page + number });
  this.loadPosts(this.state.page + number);
};

loadLess = number => {
  this.setState({ page: this.state.page - number });
  this.loadPosts(this.state.page - number);
};

  renderPosts = (posts) => {
    return (

      <div className="row">
        {posts.map((post, index) => {
            const posterId = post.created?`/user/${post.postedBy._id}`:"";
            const posterName = post.created?post.postedBy.name:" Unknown";
            return(
              <div key={index} className="col-md-4 card-hover" title="Read more">
              <Link style={{textDecoration:"none", color:"black"}}
                to={`/post/${post._id}`}

              >
                <div style={{borderRadius:"10px"}} data-aos="fade-up"
                 class="card mb-4 ">

            <img
                className="card-img-top"
                style={{height:"250px",width:"100%", objectFit:"cover", borderRadius:"10px 10px 0 0"}}
                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                onError={i=>(i.target.src=`${PostAvatar}`)}
                 alt="post Image" />
                <div class="card-body">
              <h5 class="card-title">{post.title}</h5>
              <p class="card-text">{post.body.substring(0,50)}...</p>
              <br/>
              <p className="font-italic mark">
                Posted by <Link to ={posterId}>{posterName}</Link>
                  {" "} on {new Date(post.created).toDateString()}
              </p>



            </div>
            </div>
            </Link>
            </div>
            )



        })}
      </div>
    );
  };


  render() {
    const { posts,page, checkPostLength } = this.state;
    return (
      <div className="container">

        {!posts.length ? (
                    <div className="jumbotron text-center">
                    <h2>Loading...</h2>
                    </div>
                ):(
                    <>
                    <h2 className="mt-5 mb-5">Recent Posts</h2>
                    {this.renderPosts(posts)}

                    </>
                )}
                {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                        onClick={() => this.loadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                    ""
                )}
                  {console.log(posts.length)}
                {(posts.length) ? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                    ""
                )}

      </div>
    );
  }
}
