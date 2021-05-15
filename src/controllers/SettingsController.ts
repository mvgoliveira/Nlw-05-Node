import { Request, Response } from "express";
import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../models/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsControllers {
   private settingsRepository: Repository<Setting>

   constructor() {
      this.settingsRepository = getCustomRepository(SettingsRepository);
   }

   async create(req: Request, res: Response) {
      const { chat, username } = req.body;

      const userAlreadyExists = await this.settingsRepository.findOne({ username });

      try {
         if (userAlreadyExists) {
            throw new Error("User Already Exists");
         }
      } catch (err) {
         return res.status(400).json({ error: "User Already Exists" })
      }

      const settings = this.settingsRepository.create({
         chat,
         username
      });

      await this.settingsRepository.save(settings);

      return res.json(settings);
   }
}

export { SettingsControllers }