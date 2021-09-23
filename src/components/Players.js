import { useEffect } from "react";
import useStore from "../store";
import { baseURL } from "../globals";
import "../styles/players.css";

function PlayerSlot({ name }) {
	return (
		<div className="player-slot">
			<p>{name}</p>
		</div>
	);
}

function Players() {
	const lobbyUsers = useStore((state) => state.lobbyUsers);

	//fetch the lobby users here

	if (lobbyUsers) {
		return (
			<section className="lobby-section players-section">
				<div className="section-container">
					<h2>Players</h2>
					<div className="player-slot-container">
						{lobbyUsers.map((user) => {
							return <PlayerSlot name={user.userName} />;
						})}
					</div>
				</div>
			</section>
		);
	}
	return <h2>Loading...</h2>;
}

export default Players;
