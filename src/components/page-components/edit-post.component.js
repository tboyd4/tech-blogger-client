import React, { Component } from "react";
import axios from 'axios';

export default class EditPost extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePostText = this.onChangePostText.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      postText: "",
      author: "",
      authors: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/posts/' + this.props.match.params.id)
        .then(res => {
            this.setState({
                title: res.data.title,
                description: res.data.description,
                postText: res.data.postText,
                author: res.data.author
            })
        })
        .catch(err => console.log(err));

    axios.get('http://localhost:5000/authors')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            authors: res.data.map(author => author.fullname)
          })
        }
      })
  }

  onChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  onChangeDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }

  onChangePostText(event) {
    this.setState({
      postText: event.target.value,
    });
  }

  onChangeAuthor(event) {
    this.setState({
      author: event.target.value,
    });
  }

  onFormSubmit(event) {
    event.preventDefault();

    const post = {
      title: this.state.title,
      description: this.state.description,
      postText: this.state.postText,
      author: this.state.author,
    };

    console.log(post);

    axios.post('http://localhost:5000/posts/update/' + this.props.match.params.id, post)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

    window.location = "/";
  }

  render() {
    return (
      <div className="container">
        <h3>Edit Post Post</h3>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Post Body: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.postText}
              onChange={this.onChangePostText}
            />
          </div>
          <div className="form-group">
            <label>Author: </label>
            <select
              required
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}
            >
              {this.state.authors.map((author) => {
                return (
                  <option key={author} value={author}>
                    {author}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Edit Post" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
