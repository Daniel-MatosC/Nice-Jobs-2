import { Router } from "express";

const categoriesRoutes = Router();

import createCategoryController from "../controllers/categories/createCategory.controller";
import listCategoriesController from "../controllers/categories/listCategories.controller";
import listServicesOnCategoryController from "../controllers/categories/listServicesOnCategory.controller";

categoriesRoutes.post("/categories", createCategoryController);
categoriesRoutes.get("/categories", listCategoriesController);
categoriesRoutes.get("/categories/:id", listServicesOnCategoryController);

export default categoriesRoutes;
