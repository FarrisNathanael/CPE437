import { Schema, model } from "mongoose";
// @ts-ignore
import { GameData } from "../models/saves";

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

function index(): Promise<GameData[]> {
    return SavesModel.find().exec();
}

function get(name: string): Promise<GameData> {
    return SavesModel.findOne({ name }).then((save) => {
        if (!save) throw `${name} not found`;
        return save;
    });
}

function create(json: GameData): Promise<GameData> {
    const s = new SavesModel(json);
    return s.save();
}

function update(name: string, save: GameData): Promise<GameData> {
    return SavesModel.findOneAndUpdate({ name }, save, { new: true }).then(
        (updated) => {
            if (!updated) throw `${name} not updated`;
            return updated as GameData;
        }
    );
}

function remove(name: string): Promise<void> {
    return SavesModel.findOneAndDelete({ name }).then((deleted) => {
        if (!deleted) throw `${name} not deleted`;
    });
}

// default export matches how routes import it
export default { index, get, create, update, remove };