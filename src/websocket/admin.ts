import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";

io.on("connect", async (socket) => {
   const connectionsService = new ConnectionsService();
   const messagesService = new MessagesService();

   const allConnectionWithoutAdmin = await connectionsService.findAllWithoutAdmin();

   io.emit("admin-list-all-users", allConnectionWithoutAdmin);

   socket.on("admin_list_messages_by_user", async (params) => {
      const { user_id } = params;

      const allMessages = await messagesService.showByUser(user_id);
   });
});
