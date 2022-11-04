import { Request, Response } from "express";
import listCategoriesService from "../../services/categories/listCategories.service";

const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();

  return res.send(categories);
};

export default listCategoriesController;
