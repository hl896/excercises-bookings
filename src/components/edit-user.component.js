import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      gender: '',
    }
  }

  componentDidMount() {
    axios.get('https://localhost:63448/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          gender: response.data.gender,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('https://localhost:63448/users/')
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      gender: this.state.gender,
    };

    console.log(user);

    axios.post('https://localhost:63448/users/update/'+this.props.match.params.id, user)
      .then(res => console.log(res.data));
    
    window.location = '/userList';
  }

  render() {
    return (
      <div>
        <h3>Edit User</h3>
        <form onSubmit={this.onSubmit}>
          
          <div className="form-group"> 
            <label>Username: </label>
            <label ref="userInput"
                className="form-control"
                value={this.state.username}
                >
                    {this.state.username}
            </label>
          </div>
          <div className="form-group"> 
            <label>Gender: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.gender}
                onChange={this.onChangeGender}
                placeholder={this.onChangeGender}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Update User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}