import { handleErrorMiddleware } from "./middlewares/erro.middleware";
import "reflect-metadata";
import express from "express";
import servicesRoutes from "./routes/services.routes";
import categoriesRoutes from "./routes/categories.routes";

const app = express();
app.use(express.json());

import servicesRoutes from "./routes/services.routes";
import categoriesRoutes from "./routes/categories.routes";

app.use("/testando", (req, res) => {
  res.send("Hello World");
});

app.use(handleErrorMiddleware);
export default app;
