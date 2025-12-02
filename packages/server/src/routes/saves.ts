import express, { Request, Response } from "express";
// @ts-ignore
import { GameData } from "../models/saves";

import Saves from "../services/saves-svc";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
    Saves.index()
        .then((list: GameData[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:name", (req: Request, res: Response) => {
    const { name } = req.params;

    Saves.get(name)
        .then((save: GameData) => res.json(save))
        .catch((err) => res.status(404).send(err));
});

// POST
router.post("/", (req: Request, res: Response) => {
    const newSave = req.body as GameData;

    Saves.create(newSave)
        .then((save: GameData) => res.status(201).json(save))
        .catch((err) => res.status(500).send(err));
});
// PUT
router.put("/:name", (req: Request, res: Response) => {
    const { name } = req.params;
    const newSave = req.body as GameData;

    Saves.update(name, newSave)
        .then((save: GameData) => res.json(save))
        .catch(() => res.status(404).end());
});

// DELETE
router.delete("/:name", (req: Request, res: Response) => {
    const { name } = req.params;

    Saves.remove(name)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;