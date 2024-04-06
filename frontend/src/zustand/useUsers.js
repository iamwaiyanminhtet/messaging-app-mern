import { create } from "zustand";

const useUsers = create((set) => ({
    sampleUsers : [],
    setSampleUsers : (sampleUsers) => set({ sampleUsers }),
    curUserFriends : [],
    setCurUserFriends : (curUserFriends) => set({curUserFriends}),
    messages : [],
    setMessages : (messages) => set({messages}),
}));

export default useUsers;