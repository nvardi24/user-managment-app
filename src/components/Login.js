import React, { useState } from "react";
import "./styles.css";
import { getToken } from "../util";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
function Login(props) {
	// React States
	const [errorMessages, setErrorMessages] = useState({});
	// User Login info
	let navigate = useNavigate();
	const errors = {
		uname: "invalid username",
		pass: "invalid password",
	};

	const handleSubmit = (event) => {
		//Prevent page reload
		event.preventDefault();

		const { uname, pass } = document.forms[0];

		// Find user login info
		const userData = props.database.find((user) => user.uname === uname.value);

		// Compare user info
		if (userData) {
			if (userData.password !== pass.value) {
				// Invalid password
				setErrorMessages({ name: "pass", message: errors.pass });
			} else {
				getToken(userData).then((response) => {
					props.setIsLoggedIn({
						state: true,
						user: userData,
					});
					window.localStorage.setItem("user", JSON.stringify(response));
				});
				console.log(props.IsLoggedIn);
				navigate("/users");
			}
		} else {
			// Username not found
			setErrorMessages({ name: "uname", message: errors.uname });
		}
	};

	// Generate JSX code for error message
	const renderErrorMessage = (name) =>
		name === errorMessages.name && (
			<div className="error">{errorMessages.message}</div>
		);

	// JSX code for login form
	const renderForm = (
		<div className="form">
			<form onSubmit={handleSubmit}>
				<div className="input-container">
					<TextField label="Username" name="uname" required variant="filled" />

					{renderErrorMessage("uname")}
				</div>
				<div className="input-container">
					<TextField
						label="Password"
						type="password"
						name="pass"
						required
						variant="filled"
					/>

					{renderErrorMessage("pass")}
				</div>
				<div className="button-container">
					<Button variant="contained" type="submit">
						Login
					</Button>
				</div>
			</form>
		</div>
	);

	return (
		<div className="app">
			<div className="login-form">
				<div className="title">Sign In</div>
				{renderForm}
			</div>
		</div>
	);
}
export default Login;
