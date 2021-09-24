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
        leaveModal: false,
        setLeaveModal: (value) => set({leaveModal: value}),
		currentUserId: null,
		setCurrentUserId: (id) => set({ currentUserId: id }),
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

		// CHAT
		messageTextField: "",
		setMessageTextField: (text) => set({ messageTextField: text }),
		messages: [],
		setMessages: (messages) => set({ messages: messages }),
		postAMessage: (body) => {
			return fetch(`http://localhost:8000/messages`, {
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
				.then((data) => {
					const messages = get().messages;
					const setMessages = get().setMessages;
					console.log("data", data);
					if (messages.length === 0) {
						setMessages([data]);
					} else {
						setMessages([...messages, data]);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		},
		fetchLobbyMessages: (lobbyId) => {
			fetch(`http://localhost:8000/messages/${lobbyId}`)
				.then((res) => {
					console.log(res);
					if (!res.ok) {
						throw Error(res.statusText);
					}
					return res.json();
				})
				.then((messages) => {
					console.log("messages,store", messages);
					const setMessages = get().setMessages;
					setMessages(messages);
					return messages;
				})
				.catch((error) => {
					console.error(error);
				});
		},
	}))
);

export default useStore;
