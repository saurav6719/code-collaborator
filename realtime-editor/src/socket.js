import { io } from 'socket.io-client';

export const initSocket = async () => {
  const options = {
    'force new connection': true,
    reconnectionAttempts: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
  };
  console.log('Initializing socket with options:', options);
  return io(process.env.REACT_APP_BACKEND_URL, options);
};
