import { useHistory } from "react-router";
import useStore from "../store";
import "../styles/login.css";

function SignUp() {
	const usernameField = useStore((state) => state.usernameField);
	const setUsernameField = useStore((state) => state.setUsernameField);
	const passwordField = useStore((state) => state.passwordField);
	const setPasswordField = useStore((state) => state.setPasswordField);
	const userSignUp = useStore((state) => state.userSignUp);
	const history = useHistory();

	function handleOnSubmit(event) {
		event.preventDefault();

		const userBody = {
			username: usernameField,
			password: passwordField,
			avatarURL: `https://robohash.org/${usernameField}`,
		};
		userSignUp(userBody).then(() => {
			history.push("/lobbies");
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
					type="text"
					className="password"
					id="password"
					name="password"
					placeholder="Password"
					onChange={(event) => setPasswordField(event.target.value)}
					value={passwordField}
				></input>
				<button>Sign In</button>
			</div>
		</form>
	);
}

export default SignUp;
