import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

export default class Navbar extends Component {
	render() {
		return (
			<nav
				className="navbar navbar-dark bg-dark navbar-expand-sm"
				style={{ marginBottom: "20px" }}
			>
				<a className="navbar-brand" href="https://shafiqimtiaz.github.io/">
					<img
						src={logo}
						alt="logo"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>
				</a>
				<Link to="/" className="navbar-brand">
					Ex-Tracker
				</Link>

				<div className="navbar-collapse">
					<ul className="navbar-nav">
						<li className="navbar-item">
							<Link to="/" className="nav-link">
								Exercises
							</Link>
						</li>
						<li className="navbar-item">
							<Link to="/create" className="nav-link">
								Create Exercise
							</Link>
						</li>
						<li className="navbar-item">
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
