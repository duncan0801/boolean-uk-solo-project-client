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
				.catch((error) => {
					console.error(error);
				});
		},
		fetchLobbyUsers: (lobbyId) => {
			fetch(`http://localhost:8000/users/${lobbyId}`);
		},
		addUserToLobby: (body) => {
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
					console.log("user added", res.json());
					return res.json();
				})
				.catch((error) => {
					console.error(error);
				});
		},
	}))
);

export default useStore;
