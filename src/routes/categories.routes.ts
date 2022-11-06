import { Router } from "express";

const categoriesRoutes = Router();

import createCategoryController from "../controllers/categories/createCategory.controller";
import listCategoriesController from "../controllers/categories/listCategories.controller";
import listServicesOnCategoryController from "../controllers/categories/listServicesOnCategory.controller";
import { ensureAuth } from "../middlewares/ensureAuth.middleware";

categoriesRoutes.post("/categories", createCategoryController);
categoriesRoutes.get("/categories", listCategoriesController);
categoriesRoutes.get(
  "/categories/:id/services",
  ensureAuth,
  listServicesOnCategoryController
);

export default categoriesRoutes;
