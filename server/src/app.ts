import express, { Application } from "express";
import routes from "./routes/index";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();

app.use(cors({
    origin: [process?.env?.CLIENT_WEB!, "http://localhost:5173"]
}))

app.use(express.json());

// rotas
app.use("/api", routes);

// middlewares
app.use(errorHandler);


export default app;