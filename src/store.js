import create from "zustand";
import { devtools } from "zustand/middleware";
import {
	genericFetch,
	genericFetchById,
	genericPost,
	handleErrors,
} from "./globals";

const useStore = create(
	devtools((set, get) => ({
		//HOME PAGE
		tabIndex: 1,
		setTabIndex: (tabIndex) => set({ tabIndex: tabIndex }),
		lobbyId: null,
		setLobbyId: (lobbyId) => set({ lobbyId: lobbyId }),
		anonymousUsername: "",
		setAnonymousUsername: (name) => set({ anonymousUsername: name }),
		requestedLobbyId: "",
		setRequestedLobbyId: (id) => set({ requestedLobbyId: id }),

		//LOBBIES
		lobbyHasBenCreated: false,
		setLobbyHasBeenCreated: (value) => set({ lobbyHasBenCreated: value }),
		lobbyUsers: null,
		setLobbyUsers: (users) => set({ lobbyUsers: users }),
		fetchLobbyById: (lobbyId) => {
			return fetch(`http://localhost:8000/lobbies/${lobbyId}`)
				.then((res) => {
					if (!res.ok) {
						throw Error(res.statusText);
					}
					return res.json();
				})
				.then((lobby) => {
					get().setLobbyUsers(lobby.users);
					get().setLobbyId(lobby.id);
					get().setLobbyHasBeenCreated(true);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		createLobby: (body) => {
			return fetch(`http://localhost:8000/lobbies`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => {
					if (!res.ok) {
						throw Error(res.statusText);
					}
					return res.json();
				})
				.then((lobby) => {
					get().setLobbyId(lobby.id);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		fetchLobbyUsers: (lobbyId) => {
			fetch(`http://localhost:8000/users/${lobbyId}`);
		},
		addUserToLobby: (body) => {
			return fetch(`http://localhost:8000/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => {
					if (!res.ok) {
						throw Error(res.statusText);
					}
					return res.json();
				})
				.catch((error) => {
					console.error(error);
				});
		},
	}))
);

export default useStore;
