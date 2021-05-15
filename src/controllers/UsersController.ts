import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UsersRepository";

class UserController {
   async create(req: Request, res: Response) {
      const { email } = req.body;
      
      const userRepository = getCustomRepository(UserRepository);

      const userAlreadyExists = await userRepository.findOne({ email });

      if (userAlreadyExists) {
         return res.json( userAlreadyExists );
      }

      const user = userRepository.create({
         email
      });

      await userRepository.save(user);

      return res.json(user);
   }
}

export { UserController }