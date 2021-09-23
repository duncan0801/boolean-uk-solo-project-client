import { useHistory } from "react-router";
import useStore from "../store";

function JoinARoom() {
	const history = useHistory();
	const setRequestedLobbyId = useStore((state) => state.setRequestedLobbyId);
	const requestedLobbyId = useStore((state) => state.requestedLobbyId);
	const addUserToLobby = useStore((state) => state.addUserToLobby);
	const anonymousUsername = useStore((state) => state.anonymousUsername);
	const setAnonymousUsername = useStore(
		(state) => state.setAnonymousUsername
	);

	function handleLobbyOnChange(event) {
		setRequestedLobbyId(event.target.value);
	}
	function handleNicknameOnChange(event) {
		setAnonymousUsername(event.target.value);
	}
	function handleOnSubmit(event) {
		event.preventDefault();

		const reqBody = {
			lobbyId: requestedLobbyId,
			userName: anonymousUsername,
		};
        localStorage.setItem("user", JSON.stringify(anonymousUsername));

		// 1. Add the user to the lobby, making sure their name is unique
		addUserToLobby(reqBody).then((data) => {
			history.push(`/lobby/${requestedLobbyId}`);
			console.log(data);
		});
		// 2. If response is okay then direct them to the right lobby
	}
	return (
		<form onSubmit={handleOnSubmit}>
			<input
				onChange={handleLobbyOnChange}
				placeholder="Enter lobby ID"
				type="text"
				value={requestedLobbyId}
			></input>
			<input
				onChange={handleNicknameOnChange}
				type="text"
				placeholder="Pick a nickname"
				value={anonymousUsername}
			></input>
			<button type="submit">Go To Lobby</button>
		</form>
	);
}

export default JoinARoom;
