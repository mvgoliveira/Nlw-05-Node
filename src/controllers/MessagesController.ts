import { Request, Response } from "express";
import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../models/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

class MessagesController {
   private messageRepository: Repository<Message>;

   constructor() {
      this.messageRepository = getCustomRepository(MessagesRepository);
   }
   
   async create(req: Request, res: Response) {
      const { admin_id, text, user_id } = req.body;

      const message = this.messageRepository.create({
         admin_id,
         text,
         user_id
      })

      await this.messageRepository.save(message);

      return res.json( message );
   }

   async showByUser(req: Request, res: Response) {
      const { user_id } = req.params; 
   
      const list = await this.messageRepository.find({
         where: { user_id },
         relations: ["user"],
      });

      return res.json(list);
   }
}

export { MessagesController }