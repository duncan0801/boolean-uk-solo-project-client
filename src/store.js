import create from "zustand";
import { devtools } from "zustand/middleware";
import { genericFetch, genericFetchById, genericPost } from "./globals";

const useStore = create(
	devtools((set, get) => ({
		tabIndex: 1,
		setTabIndex: (tabIndex) => set({ tabIndex: tabIndex }),
		lobbyId: null,
		setLobbyId: (lobbyId) => set({ lobbyId: lobbyId }),
		anonymousUsername: "",
		setAnonymousUsername: (name) => set({ anonymousUsername: name }),

		//LOBBIES
		lobbyUsers: [],
		setLobbyUsers: (users) => ({ lobbyUsers: users }),
		fetchLobbyById: (id) => {
			genericFetchById("/lobbies", id);
		},
		createLobby: (body) => {
			fetch(`http://localhost:8000/lobbies`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => res.json())
				.then((data) => console.log("POSTED:", data))
				.catch((error) => {
					console.error(error);
				});
		},
        fetchUsers: () => {
            fetch(`http://localhost:8000/user`)
        }
	}))
);

export default useStore;
