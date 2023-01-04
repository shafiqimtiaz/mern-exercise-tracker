import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import ExercisesList from "./components/exercises-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";

function App() {
	return (
		<div className="container">
			<Navbar />
			<br />
			<Routes>
				<Route path="/" exact element={<ExercisesList />} />
				<Route path="/edit/:id" element={<EditExercise />} />
				<Route path="/create" element={<CreateExercise />} />
				<Route path="/user" element={<CreateUser />} />
			</Routes>
		</div>
	);
}

export default App;
