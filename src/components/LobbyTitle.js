import { useEffect } from "react";
import useStore from "../store";
import { baseURL } from "../globals";

function LobbyTitle() {
	const lobbyId = useStore((state) => state.lobbyId);


	if (lobbyId) {
		return (
			<section className="lobby-title-section">
				<h1>Lobby Id: {lobbyId}</h1>
			</section>
		);
	}
	return <h2>Loading...</h2>;
}

export default LobbyTitle;
