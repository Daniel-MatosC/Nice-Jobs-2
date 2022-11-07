import { handleErrorMiddleware } from "./middlewares/erro.middleware";
import "reflect-metadata";
import express from "express";
import "express-async-errors";
import servicesRoutes from "./routes/services.routes";
import categoriesRoutes from "./routes/categories.routes";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/sessions.routes";
import schedulesRoutes from "./routes/schedules.routes";

const app = express();
app.use(express.json());

app.use(express.json());
app.use("/login", sessionRoutes);
app.use("/users", userRoutes);
app.use("/services", servicesRoutes);
app.use("/categories", categoriesRoutes);
app.use('/schedules', schedulesRoutes);

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.use(handleErrorMiddleware);
export default app;
