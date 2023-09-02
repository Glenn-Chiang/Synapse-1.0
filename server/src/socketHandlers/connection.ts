import { Server, Socket } from "socket.io";
import { getChannels, joinChannels } from "./channels";

const handleConnect = async (io: Server, socket: Socket) => {
  const userId = socket.data.userId
  socket.join(`user:${userId}`); // When user opens multiple tabs, each socket will join the same room identified by the userId
  const channels = await getChannels(userId);
  await joinChannels(socket, channels);
};

const handleDisconnect = async (io: Server, socket: Socket) => {
  const userId = socket.data.userId;
  const channels = await getChannels(userId);

  socket.on("disconnect", async () => {
    const userSockets = await io.in(`user:${userId}`).fetchSockets(); // Get all sockets associated with user
    const isDisconnected = userSockets.length === 0; // User is only considered disconnected when they close all sockets
    if (isDisconnected) {
      channels.forEach((channel) => {
        socket
          .to(channel._id.toString())
          .emit("user disconnected", socket.data.userId);
      });
    }
  });
};

  export {handleConnect, handleDisconnect}
