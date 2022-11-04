import { Router } from "express";

const categoriesRoutes = Router();

import createCategoryController from "../controllers/categories/createCategory.controller";
import listCategoriesController from "../controllers/categories/listCategories.controller";

categoriesRoutes.post("/categories", createCategoryController);
categoriesRoutes.get("/categories", listCategoriesController);

export default categoriesRoutes;
