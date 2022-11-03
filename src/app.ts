import { handleErrorMiddleware } from "./middlewares/erro.middleware";
import "reflect-metadata";
import express from "express";
import servicesRoutes from "./routes/services.routes";

const app = express();
app.use(express.json());

app.use(servicesRoutes);

app.use("/testando", (req, res) => {
  res.send("Hello World");
});

app.use(handleErrorMiddleware);
export default app;
