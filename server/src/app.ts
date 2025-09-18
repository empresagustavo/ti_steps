import express, { Application } from "express";
import routes from "./routes/index";

const app: Application = express();

// middlewares
app.use(express.json());

// rotas
app.use("/api", routes);

export default app;