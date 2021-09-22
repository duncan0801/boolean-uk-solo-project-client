import { useEffect } from "react";
import useStore from "../store";
import { baseURL } from "../globals";

function Players() {
	const lobbyUsers = useStore((state) => state.lobbyUsers);

	//fetch the lobby users here

	if (lobbyUsers) {
	return (
		<section className="lobby-section players-section">
			<div className="section-container">
				<h2>Players</h2>
				{lobbyUsers.map((user) => {
						return <h3>{user.userName}</h3>;
					})}
			</div>
		</section>
	);
	}
	return <h2>Loading...</h2>;
}

export default Players;
