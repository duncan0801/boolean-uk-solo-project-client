import useStore from "../store";

function SignUp() {
	const usernameField = useStore((state) => state.usernameField);
	const setUsernameField = useStore((state) => state.setUsernameField);
	const passwordField = useStore((state) => state.passwordField);
	const setPasswordField = useStore((state) => state.setPasswordField);
	const userSignUp = useStore((state) => state.userSignUp);

	function handleOnSubmit(event) {
		event.preventDefault();

		const userBody = {
			username: usernameField,
			password: passwordField,
			avatarURL: `https://robohash.org/${usernameField}`,
		};
		userSignUp(userBody);
	}
	return (
		<form onSubmit={handleOnSubmit}>
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
		</form>
	);
}

export default SignUp;
