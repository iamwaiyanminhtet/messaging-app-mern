import { create } from "zustand";

const useUsers = create((set) => ({
    sampleUsers : [],
    setSampleUsers : (sampleUsers) => set({ sampleUsers }),
    curUserFriends : [],
    setCurUserFriends : (friends) => set({friends}) 
}));

export default useUsers;