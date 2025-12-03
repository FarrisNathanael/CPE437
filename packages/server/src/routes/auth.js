import dotenv from "dotenv";
import express, {
    NextFunction,
    Request,
    Response
} from "express";
import jwt from "jsonwebtoken";

import credentials from "../services/credential-svc";

const router = express.Router();

dotenv.config();
const TOKEN_SECRET: string =
    process.env.TOKEN_SECRET || "NOT_A_SECRET";