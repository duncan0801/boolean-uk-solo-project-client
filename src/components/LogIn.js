import useStore from "../store";

function LogIn() {
	const usernameField = useStore((state) => state.usernameField);
	const setUsernameField = useStore((state) => state.setUsernameField);
	const passwordField = useStore((state) => state.passwordField);
	const setPasswordField = useStore((state) => state.setPasswordField);

	function handleOnSubmit(event) {
		event.preventDefault();
		let userBody = {};

		fetch(`
        https://robohash.org/${usernameField}`).then((avatarURL) => {
			userBody = {
				username: usernameField,
				password: passwordField,
				avatarURL: avatarURL,
			};
		});
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
			<button>Log In</button>
		</form>
	);
}

export default LogIn;
