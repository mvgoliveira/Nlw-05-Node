import { Request, Response } from "express";
import { getCustomRepository, Repository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";

class MessagesController {
   private messageRepository: Repository<Message>;

   constructor() {
      this.messageRepository = getCustomRepository(MessagesRepository);
   }
   async create(req: Request, res: Response) {
      const { admin_id, text, user_id } = req.body;

      const message = messageRepository.create({
         admin_id,
         text,
         user_id
      })

      await messageRepository.save(message);

      return res.json( message );
   }

   async showByUser(req: Request, res: Response) {
      const { user_id } = req.params; 
   
      const list = await messageRepository.find({
         where: { user_id },
         relations: ["user"],
      });

      return res.json(list);
   }
}

export { MessagesController }