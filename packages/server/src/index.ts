// src/index.ts
// import express, { Request, Response } from "express";
// import { connect } from "./services/mongo";
// // import Travelers from "./services/traveler-svc";
// import saves from "./routes/saves";
//
// connect("cluster0");
// const app = express();
// app.use(express.json());
//
// app.use("/api/saves", saves);
// const port = process.env.PORT || 3000;
// // const staticDir = process.env.STATIC || "public";
// //
// // app.use(express.static(staticDir));
//
// app.get("/hello", (req: Request, res: Response) => {
//     res.send("Hello, World");
// });
//
//     app.listen(port, () => {
//         console.log(`Server running at http://localhost:${port}`);
//     });

import express from "express";
import { connect } from "./services/mongo";
import saves from "./routes/saves";

connect("cluster0"); // or whatever DB name you intend
const app = express();
app.use(express.json());

app.use("/api/saves", saves);

app.get("/hello", (_req, res) => {
    res.send("Hello, World");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});