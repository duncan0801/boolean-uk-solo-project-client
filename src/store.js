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

const tokenFromStorage = localStorage.getItem("token");
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
		requestedLobbyId: "",
		setRequestedLobbyId: (id) => set({ requestedLobbyId: id }),
		getUserById: (id) => {
			fetch(`http://localhost:8000/users/${id}`, {
				method: "GET",
				headers: {
					authorization: `Bearer ${tokenFromStorage}`,
				},
			})
				.then((res) => res.json())
				.then((user) => {
					console.log("fetched user", user.msg);
					get().setCurrentUser(user);
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
		removeUserFromLobby: (userId) => {
			fetch(`http://localhost:8000/users/${userId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}).then(() => {
				const filteredUsers = get().lobbyUsers.filter(
					(user) => user.id !== userId
				);
				get().setLobbyUsers(filteredUsers);
			});
		},
		userSignUp: (body) => {
			console.log("Body into create user function", body);
			return fetch(`http://localhost:8000/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => res.json())
				.then((data) => {
					const token = data.token;

					console.log("Sign up fetch:", token);

					if (token) {
						const user = jwtDecode(token);

						get().setAuthenticatedUser(user);

						localStorage.setItem("token", JSON.stringify(token));

						// Push to their lobby library
					}
				});
		},
		userLogIn: (body) => {
			console.log("Body into create user function", body);
			return fetch(`http://localhost:8000/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => res.json())
				.then((token) => {
					if (token) {
						console.log("token: ", token);

						const user = jwtDecode(token);
						get().setAuthenticatedUser(user);

						localStorage.setItem("token", JSON.stringify(token));

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
