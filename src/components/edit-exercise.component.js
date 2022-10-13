import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";

// const apiEndPoint = "http://localhost:5000/";
const apiEndPoint = "https://mern-ex-tracker-db.herokuapp.com/";

export function withRouter(Children) {
	return (props) => {
		const match = { params: useParams() };
		return <Children {...props} match={match} />;
	};
}

class EditExercise extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: "",
			description: "",
			duration: 0,
			date: new Date(),
			users: [],
		};
	}

	componentDidMount() {
		axios
			.get(apiEndPoint + "exercises/" + this.props.match.params.id)
			.then((response) => {
				this.setState({
					username: response.data.username,
					description: response.data.description,
					duration: response.data.duration,
					date: new Date(response.data.date),
				});
			})
			.catch((err) => console.error(err.message));

		axios
			.get(apiEndPoint + "users/")
			.then((res) => {
				if (res.data.length > 0) {
					this.setState({
						users: res.data.map((user) => user.username),
					});
				}
			})
			.catch((err) => console.error(err.message));
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}

	onChangeDescription(e) {
		this.setState({
			description: e.target.value,
		});
	}

	onChangeDuration(e) {
		this.setState({
			duration: e.target.value,
		});
	}

	onChangeDate(date) {
		this.setState({
			date: date,
		});
	}

	async onSubmit(e) {
		e.preventDefault();

		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date,
		};

		axios
			.post(
				apiEndPoint + "exercises/update/" + this.props.match.params.id,
				exercise
			)
			.then((res) => {
				console.log(res.data);
				window.location.href = "/";
			})
			.catch((e) => console.error(e.message));

		this.setState({
			username: "",
			description: "",
			duration: 0,
			date: new Date(),
		});
	}

	render() {
		return (
			<div>
				<h3>Edit Exercise Log</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<select
							ref="userInput"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUsername}
						>
							{this.state.users.map(function(user) {
								return (
									<option key={user} value={user}>
										{user}
									</option>
								);
							})}
						</select>
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
						<label>Duration (in minutes): </label>
						<input
							type="text"
							className="form-control"
							value={this.state.duration}
							onChange={this.onChangeDuration}
						/>
					</div>
					<div className="form-group">
						<label>Date: </label>
						<div>
							<DatePicker
								selected={this.state.date}
								onChange={this.onChangeDate}
							/>
						</div>
					</div>

					<div className="form-group">
						<input
							type="submit"
							value="Edit Exercise"
							className="btn btn-primary"
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(EditExercise);
