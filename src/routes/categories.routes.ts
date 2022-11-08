import { Router } from "express";

const categoriesRoutes = Router();

import createCategoryController from "../controllers/categories/createCategory.controller";
import listCategoriesController from "../controllers/categories/listCategories.controller";
import listServicesOnCategoryController from "../controllers/categories/listServicesOnCategory.controller";
import { ensureAuth } from "../middlewares/ensureAuth.middleware";

categoriesRoutes.post("", createCategoryController);
categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.get(
  "/:id/services",
  ensureAuth,
  listServicesOnCategoryController
);

export default categoriesRoutes;
