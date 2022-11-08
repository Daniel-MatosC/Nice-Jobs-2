import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ({
  name,
}: ICategoryRequest): Promise<Categories> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categoryExists = await categoryRepository.findOneBy({ name });

  if (categoryExists) {
    throw new AppError("Category already exists");
  }

  const category = new Categories();
  category.name = name;
  category.id;

  categoryRepository.create(category);
  await categoryRepository.save(category);

  return category;
};

export default createCategoryService;
