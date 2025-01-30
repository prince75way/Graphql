import { Server as HttpServer } from 'http'; // Import HTTP server from 'http'
import { Server } from 'socket.io'; // Import Socket.io
import { Express } from 'express'; // Express type

export const setupSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173', // Ensure the frontend URL is correct
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`); // Log when a user connects

    // Event: Join a group
    socket.on('joinGroup', (groupId: string) => {
      socket.join(groupId); // Join a room based on group ID
      console.log(`User ${socket.id} joined group ${groupId}`);
    });

    // Event: Send a message in a group
    socket.on('sendMessage', (data: { groupId: string, message: string }) => {
      console.log(`Message received for group ${data.groupId}:`, data.message);
      io.to(data.groupId).emit('receiveMessage', data.message); // Emit to all users in the room
      console.log(`Message sent to group ${data.groupId}:`, data.message);
    });

    // Event: Disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};
