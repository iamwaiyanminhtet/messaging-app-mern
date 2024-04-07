import { create } from "zustand";

const useUsers = create((set) => ({
    sidebarUsers : [],
    setSidebarUsers : (sidebarUsers) => set({ sidebarUsers }),
    messages : [],
    setMessages : (messages) => set({messages}),
}));

export default useUsers;