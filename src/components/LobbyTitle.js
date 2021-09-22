import { useEffect } from "react";
import useStore from "../store";
import { baseURL } from "../globals";

function LobbyTitle() {
	const lobbyUsers = useStore((state) => state.lobbyUsers);

	//fetch the lobby users here

	return (
		<section className="lobby-title-section">
			<h1>Lobby Id: {}</h1>
		</section>
	);

	return <h2>Loading...</h2>;
}

export default LobbyTitle;
