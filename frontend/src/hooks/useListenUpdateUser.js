import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useUsers from '../zustand/useUsers';

const useListenUpdateUser = () => {
    const { socket } = useSocketContext();
    const { sidebarUsers, setSidebarUsers } = useUsers();
  
    useEffect(() => {
      socket?.on('update-user', (updatedUser) => {
        setSidebarUsers(sidebarUsers.map(sb => sb._id === updatedUser._id ? updatedUser : sb));
      })
      return () => socket?.off('delete-convo')
    }, [socket, setSidebarUsers, sidebarUsers])
}

export default useListenUpdateUser