import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Post = (props) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{props.post.title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">
        {props.post.description}
      </h6>
      <p className="card-text">{props.post.postText}</p>
      <Link to={"/edit/" + props.post._id} className="card-link">
        Edit Post
      </Link>
      <a
        href="#"
        className="card-link"
        onClick={() => {
          props.deletePost(props.post._id);
        }}
      >
        Delete Post
      </a>
    </div>
  </div>
);

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.deletePost = this.deletePost.bind(this);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  postsList() {
    return this.state.posts.map((post) => {
      return <Post post={post} key={post._id} deletePost={this.deletePost} />;
    });
  }

  deletePost(id) {
    axios
      .delete("http://localhost:5000/posts/" + id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: this.state.posts.filter((post) => post._id !== id),
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return <div>{this.postsList()}</div>;
  }
}
