import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            gender: ''
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeGender(e){
        this.setState({
            gender: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            gender: this.state.gender,
        };
        
        console.log(newUser);
        this.setState({
            username: '',
            gender: '',
        })
        axios.post('https://localhost:63448/users/add', newUser)
            .then(res => console.log(res.data));
        window.location = '/userList';
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="form-group"> 
                    <label>Gender: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.gender}
                        onChange={this.onChangeGender}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
                </form>
            </div>
        )
    }
}