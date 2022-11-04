import { handleErrorMiddleware } from "./middlewares/erro.middleware";
import "reflect-metadata";
import express from "express";
import servicesRoutes from "./routes/services.routes";
import categoriesRoutes from "./routes/categories.routes";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use(express.json());

app.use("/users", userRoutes);
app.use("", servicesRoutes);
app.use("", categoriesRoutes);

app.use("/testando", (req, res) => {
  res.send("Hello World");
});

app.use(handleErrorMiddleware);
export default app;
