import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Post = (props) => (
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{props.post.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{props.post.description}</h6>
      <p class="card-text">{props.post.postText}</p>
      <Link to={"/edit/" + props.post._id} class="card-link">
        Edit Post
      </Link>
      <a
        href="#"
        class="card-link"
        onClick={() => props.deletePost(props.post._id)}
      >
        Delete Post
      </a>
    </div>
  </div>
);

export default class PostList extends Component {
  constructor(props) {
    super(props);

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
      .delete("http://localhost:5000/post/" + id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: this.state.posts.filter((post) => post._id !== id),
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return <div>{this.postList()}</div>;
  }
}
