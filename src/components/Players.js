import { useEffect } from "react";
import useStore from "../store";
import { baseURL } from "../globals";

function Players() {
	const setUsers = useStore((state) => state.setUsers);
	const users = useStore((state) => state.lobbyUsers);

	
	return (
		<section className="lobby-section players-section">
			<div class="section-container">
				<h2>Players</h2>
				{users.map((user) => {
					return <h3>user.userName</h3>;
				})}
			</div>
		</section>
	);
}

export default Players;
