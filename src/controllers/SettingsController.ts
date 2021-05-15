import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsControllers {
   async create(req: Request, res: Response) {
      const { chat, username } = req.body;

      const settingsRepository = getCustomRepository(SettingsRepository);

      const userAlreadyExists = await settingsRepository.findOne({ username });

      try {
         if (userAlreadyExists) {
            throw new Error("User Already Exists");
         }
      } catch (err) {
         return res.status(400).json({ error: "User Already Exists" })
      }

      const settings = settingsRepository.create({
         chat,
         username
      });

      await settingsRepository.save(settings);

      return res.json(settings);
   }
}

export { SettingsControllers }