// src/index.ts

import express from "express";
import { connect } from "./services/mongo";
import saves from "./routes/saves";
// @ts-ignore
//import auth from "./routes/auth";
import auth, { authenticateUser } from "./routes/auth";
import path from "path";

connect("cluster0"); // or whatever DB name you intend
const app = express();
app.use(express.json());

const staticDir = path.join(__dirname, "../../proto/dist");   // **
app.use(express.static(staticDir));                                  // **

app.use("/auth", auth);

app.use("/api/saves", authenticateUser,saves);

app.get("/hello", (_req, res) => {
    res.send("Hello, World");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});