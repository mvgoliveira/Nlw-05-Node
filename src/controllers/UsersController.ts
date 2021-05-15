import { Request, Response } from "express";
import { getCustomRepository, Repository } from "typeorm";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UsersRepository";

class UserController {
   private userRepository: Repository<User>

   constructor () {
      this.userRepository = getCustomRepository(UserRepository);
   }

   async create(req: Request, res: Response) {
      const { email } = req.body;

      const userAlreadyExists = await this.userRepository.findOne({ email });

      if (userAlreadyExists) {
         return res.json( userAlreadyExists );
      }

      const user = this.userRepository.create({
         email
      });

      await this.userRepository.save(user);

      return res.json(user);
   }
}

export { UserController }