import { Request, Response } from "express";
import createCategoryService from "../../services/categories/createCategory.service";
import { AppError } from "../../errors/appError";

const createCategoryController = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newCategory = await createCategoryService({
    name,
  });

  return res.status(201).send(newCategory);
};

export default createCategoryController;
