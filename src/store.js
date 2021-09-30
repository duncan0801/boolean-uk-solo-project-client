import { useHistory } from "react-router";
import create from "zustand";
import { devtools } from "zustand/middleware";
import {
	genericFetch,
	genericFetchById,
	genericPost,
	handleErrors,
} from "./globals";
import jwtDecode from "jwt-decode";
const backendURL = process.env.REACT_APP_BACKEND_API_URL;

const useStore = create(
	devtools((set, get) => ({
		//AUTH
		authenticatedUser: null,
		setAuthenticatedUser: (user) => set({ authenticatedUser: user }),
		usernameField: "",
		setUsernameField: (usernameString) =>
			set({ usernameField: usernameString }),
		passwordField: "",
		setPasswordField: (passwordString) =>
			set({ passwordField: passwordString }),

		//HOME PAGE
		tabIndex: 1,
		setTabIndex: (tabIndex) => set({ tabIndex: tabIndex }),
		lobbyId: null,
		setLobbyId: (lobbyId) => set({ lobbyId: lobbyId }),
		anonymousUsername: "",
		setAnonymousUsername: (name) => set({ anonymousUsername: name }),

		//LOBBY LIBRARY
		requestedLobbyName: "",
		setRequestedLobbyName: (name) => set({ requestedLobbyName: name }),
		requestedLobbyId: "",
		setRequestedLobbyId: (id) => set({ requestedLobbyId: id }),
		userLobbies: null,
		setUserLobbies: (lobbies) => set({ userLobbies: lobbies }),
		getUserById: (id) => {
			const tokenFromStorage = localStorage.getItem("token");
			fetch(`${backendURL}/users/${id}`, {
				method: "GET",
				headers: {
					authorization: `Bearer ${tokenFromStorage}`,
				},
			})
				.then((res) => res.json())
				.then((user) => {
					get().setCurrentUser(user);
				});
		},
		fetchLobbiesByUserId: () => {
			const tokenFromStorage = localStorage.getItem("token");
			fetch(`${backendURL}/lobbies/`, {
				method: "GET",
				headers: {
					authorization: `Bearer ${tokenFromStorage}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data) {
						get().setUserLobbies(data);
					}
				});
		},

		//LOBBIES
		leaveModal: false,
		setLeaveModal: (value) => set({ leaveModal: value }),
		currentUser: null,
		setCurrentUser: (user) => set({ currentUser: user }),
		lobbyHasBenCreated: false,
		setLobbyHasBeenCreated: (value) => set({ lobbyHasBenCreated: value }),
		lobbyUsers: null,
		setLobbyUsers: (users) => set({ lobbyUsers: users }),
		fetchLobbyById: (lobbyId) => {
			return fetch(`${backendURL}/lobbies/${lobbyId}`)
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
			const tokenFromStorage = localStorage.getItem("token");
			return fetch(`${backendURL}/lobbies`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${tokenFromStorage}`,
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
					return lobby;
				})
				.catch((error) => {
					console.error(error);
				});
		},
		fetchLobbyUsers: (lobbyId) => {
			fetch(`${backendURL}/users/${lobbyId}`);
		},
		addUserToLobby: (userId, lobbyId) => {
			return fetch(`${backendURL}/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId, lobbyId }),
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
		removeUserFromLobby: (lobbyId, userId) => {
			return fetch(`${backendURL}/lobbies/${lobbyId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: userId }),
			}).then((resp) => resp.json());
		},
		userSignUp: (body) => {
			return fetch(`${backendURL}/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => res.json())
				.then((data) => {
					const token = data.token;

					if (token) {
						const user = jwtDecode(token);

						get().setAuthenticatedUser(user);

						localStorage.setItem("token", token);

						// Push to their lobby library
					}
				});
		},
		userLogIn: (body) => {
			return fetch(`${backendURL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => res.json())
				.then((token) => {
					if (token) {
						const user = jwtDecode(token);
						get().setAuthenticatedUser(user);

						localStorage.setItem("token", token);

						//Push to their lobby library
					}
				});
		},

		// CHAT
		messageTextField: "",
		setMessageTextField: (text) => set({ messageTextField: text }),
		messages: [],
		setMessages: (messages) => set({ messages: messages }),
		postAMessage: (body) => {
			return fetch(`${backendURL}/messages`, {
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
			fetch(`${backendURL}/messages/${lobbyId}`)
				.then((res) => {
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
