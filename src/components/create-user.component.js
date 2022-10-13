import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// const apiEndPoint = "http://localhost:5000/";
const apiEndPoint = "https://mern-ex-tracker-db.herokuapp.com/";

const User = (props) => (
	<tr>
		<td>{props.user.username}</td>
		<td>
			<Link
				to="/"
				onClick={() => {
					props.deleteUser(props.user._id);
				}}
			>
				delete
			</Link>
		</td>
	</tr>
);

export default class CreateUser extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.deleteUser = this.deleteUser.bind(this);

		this.state = {
			username: "",
			users: [],
		};
	}

	componentDidMount() {
		axios
			.get(apiEndPoint + "users/")
			.then((res) => this.setState({ ...this.state, users: res.data }))
			.catch((err) => console.log(err));
	}

	onChangeUsername(e) {
		this.setState({
			...this.state,
			username: e.target.value,
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const user = {
			username: this.state.username,
		};

		axios
			.post(apiEndPoint + "users/add", user)
			.then((res) => {
				console.log(res.data);
				window.location.href = "/";
			})
			.catch((e) => console.error(e.message));

		this.setState({
			...this.state,
			username: "",
		});
	}

	deleteUser(id) {
		axios
			.delete(apiEndPoint + "users/" + id)
			.then((response) => console.log(response.data))
			.catch((e) => console.error(e.message));

		this.setState({
			...this.state,
			users: this.state.users.filter((el) => el._id !== id),
		});
	}

	userList() {
		return this.state.users.map((currentuser) => {
			if (currentuser.length !== 0) {
				return (
					<User
						user={currentuser}
						deleteUser={this.deleteUser}
						key={currentuser._id}
					/>
				);
			} else {
				return <div></div>;
			}
		});
	}

	render() {
		return (
			<div>
				<h3>Create New User</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUsername}
						/>
					</div>
					<div className="form-group">
						<input
							type="submit"
							value="Create User"
							className="btn btn-primary"
						/>
					</div>
				</form>
				<br />
				<h3>Current Users</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{this.userList()}</tbody>
				</table>
			</div>
		);
	}
}
