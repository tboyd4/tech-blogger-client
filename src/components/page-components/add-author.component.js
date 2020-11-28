import React, { Component } from "react";
import axios from "axios";

export default class AddAuthor extends Component {
  constructor(props) {
    super(props);

    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      fullname: "",
      email: "",
    };
  }

  onChangeFullname(event) {
    this.setState({
      fullname: event.target.value,
    });
  }

  onChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  onFormSubmit(event) {
    event.preventDefault();

    const author = {
      fullname: this.state.fullname,
      email: this.state.email,
    };

    axios
      .post("http://localhost:5000/authors/add", author)
      .then((res) => {
        console.log(res.data);
        this.setState({
          fullname: "",
          email: "",
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <h3>Create New Author</h3>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label>Full Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.fullname}
              onChange={this.onChangeFullname}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Author" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
