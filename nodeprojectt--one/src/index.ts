import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieparser());
app.use(bodyParser.json());

const server = http.createServer(app);
const port = 6000;
server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

const MONGO_URL =
  "mongodb+srv://samuelebube73:or2v3svv5rlB1On4@mycluster.lneph.mongodb.net/?retryWrites=true&w=majority&appName=mycluster";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
