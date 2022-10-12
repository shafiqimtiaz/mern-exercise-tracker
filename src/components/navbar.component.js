import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
				<Link to="/" className="navbar-brand">
					<img
						src={logo}
						alt="logo"
						width="30"
						height="30"
						className="d-inline-block align-top mx-2"
					/>
					Ex-Tracker
				</Link>

				<div className="collpase navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="navbar-item mx-2">
							<Link to="/" className="nav-link">
								Exercises
							</Link>
						</li>
						<li className="navbar-item mx-2">
							<Link to="/create" className="nav-link">
								Create Exercise
							</Link>
						</li>
						<li className="navbar-item mx-2">
							<Link to="/user" className="nav-link">
								Create User
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
