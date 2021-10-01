import { useHistory } from "react-router";
import useStore from "../store";
import "../styles/login.css";

function LogIn() {
	const usernameField = useStore((state) => state.usernameField);
	const setUsernameField = useStore((state) => state.setUsernameField);
	const passwordField = useStore((state) => state.passwordField);
	const setPasswordField = useStore((state) => state.setPasswordField);
	const userLogIn = useStore((state) => state.userLogIn);
	const history = useHistory();

	function handleOnSubmit(event) {
		event.preventDefault();
		let userBody = {
			username: usernameField,
			password: passwordField,
		};

		userLogIn(userBody).then(() => {
			history.push("/lobby-library");
		});
	}
	return (
		<form className="login-signup-form" onSubmit={handleOnSubmit}>
			<div className="form-container">
				<input
					type="text"
					className="username"
					id="username"
					name="username"
					placeholder="Username"
					onChange={(event) => setUsernameField(event.target.value)}
					value={usernameField}
				></input>
				<input
					type="password"
					className="password"
					id="password"
					name="password"
					placeholder="Password"
					onChange={(event) => setPasswordField(event.target.value)}
					value={passwordField}
				></input>
				<button className="login-logout-button">Log In</button>
			</div>
		</form>
	);
}

export default LogIn;
