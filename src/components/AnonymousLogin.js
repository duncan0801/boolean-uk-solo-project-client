import { socket } from "../App";
import useStore from "../store";
import { genericPost, genericFetch } from "../globals";
import {useHistory} from "react-router-dom";
const { v4: uuidv4 } = require("uuid");

function AnonymousLogin() {
	const history = useHistory();
	const anonymousUsername = useStore((state) => state.anonymousUsername);
	const setAnonymousUsername = useStore(
		(state) => state.setAnonymousUsername
	);
	const lobbyId = useStore((state) => state.lobbyId);
	const setLobbyId = useStore((state) => state.setLobbyId);
	const fetchLobbyById = useStore((state) => state.fetchLobbyById);
	const createLobby = useStore((state) => state.createLobby);

	function handleOnSubmit(event, socket) {
		event.preventDefault();
		const lobbyId = uuidv4();
		const postBody = {
			lobbyId: lobbyId,
			userName: anonymousUsername,
		};
		// genericPost("/lobbies", postBody);
		// genericFetch("/lobbies");
		
		
		// 1. Generate a lobby in the database with the id and the user in the usernames
        createLobby(postBody);

		// 2. update the lobbyId in the state
		setLobbyId(lobbyId);

		// 3. Connect the user to the websocket room

		// 4. Redirect them to the page with the lobbyId in the URL
        history.push(`/lobby/${lobbyId}`);
	}
	function handleOnChange(event) {
		setAnonymousUsername(event.target.value);
	}

	return (
		<form onSubmit={(event) => handleOnSubmit(event, socket)}>
			<input
				placeholder="enter your nickname..."
				type="text"
				id="username"
				name="username"
				value={anonymousUsername}
				onChange={handleOnChange}
			></input>
			<button type="submit">Go To Lobby</button>
		</form>
	);
}

export default AnonymousLogin;
