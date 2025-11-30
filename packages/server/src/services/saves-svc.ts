import { Schema, model } from "mongoose";
import { GameData } from "../models/saves.ts";

const GameSchema = new Schema<GameData>(
    {
        name: { type: String, trim: true },
        link: { type: String },
        coverSrc: { type: String },
        playerMin: { type: Number },
        playerMax: { type: Number },
        duration: { type: Number },
        status: { type: String, default: "active" },
        lastEdited: { type: Number }
    },
    { collection: "saves" }
);

const SavesModel = model<GameData>(
    "Saves",
    GameSchema
);