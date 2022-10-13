import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// const apiEndPoint = "http://localhost:5000/";
const apiEndPoint = "https://mern-ex-tracker-db.herokuapp.com/";

const Exercise = (props) => (
	<tr>
		<td>{props.exercise.username}</td>
		<td>{props.exercise.description}</td>
		<td>{props.exercise.duration}</td>
		<td>{props.exercise.date.substring(0, 10)}</td>
		<td>
			<Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
			<a
				href="/"
				onClick={() => {
					props.deleteExercise(props.exercise._id);
				}}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class ExercisesList extends Component {
	constructor(props) {
		super(props);

		this.deleteExercise = this.deleteExercise.bind(this);

		this.state = { exercises: [] };
	}

	componentDidMount() {
		axios
			.get(apiEndPoint + "exercises")
			.then((res) => this.setState({ exercises: res.data }))
			.catch((err) => console.log(err));
	}

	deleteExercise(id) {
		axios
			.delete(apiEndPoint + "exercises/" + id)
			.then((response) => console.log(response.data))
			.catch((e) => console.error(e.message));

		this.setState({
			exercises: this.state.exercises.filter((el) => el._id !== id),
		});
	}

	exerciseList() {
		return this.state.exercises.map((currentexercise) => {
			if (currentexercise.length !== 0) {
				return (
					<Exercise
						exercise={currentexercise}
						deleteExercise={this.deleteExercise}
						key={currentexercise._id}
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
				<h3>Logged Exercises</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{this.exerciseList()}</tbody>
				</table>
			</div>
		);
	}
}
