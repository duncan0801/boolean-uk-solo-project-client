function LogIn() {
	return (
		<form>
			<input
				type="text"
				className="username"
				id="username"
				name="username"
				placeholder="Username"
			></input>
			<input
				type="text"
				className="password"
				id="password"
				name="password"
				placeholder="Password"
			></input>
			<button>Log In</button>
		</form>
	);
}

export default LogIn;
