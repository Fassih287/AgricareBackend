import express, { Request, Response } from "express";
import AppData from "../../config/dbconfig";
import { Conversation } from "../../entities/conversation";

const convoRepo = AppData.getRepository(Conversation);

const router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  try {
    const { expertId, userId, message } = req.body;
    if (!expertId || !userId || !message) {
      return res.status(400).json({ message: "Miss Fields" });
    }
    const convo = new Conversation();
    convo.userId = userId;
    convo.expertId = expertId;
    convo.message = message;
    await convoRepo.save(convo);
    res.status(201).json({ message: "Added" });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/view/:eid", async (req: Request, res: Response) => {
  try {
    const expertId = parseInt(req.params.eid);
    const messages = await convoRepo.find({ where: { expertId } });
    res.status(201).json({ data: messages });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
