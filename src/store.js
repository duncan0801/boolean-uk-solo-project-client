import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
	devtools((set, get) => ({
		tabIndex: 1,
		setTabIndex: (tabIndex) => set({ tabIndex: tabIndex }),
		lobbyId: null,
		setLobbyId: (lobbyId) => set({ lobbyId: lobbyId }),
		anonymousUsername: "",
		setAnonymousUsername: (name) => set({ anonymousUsername: name }),
	}))
);

export default useStore;
