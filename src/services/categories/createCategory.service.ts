import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ({
  name,
}: ICategoryRequest): Promise<Categories> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const category = new Categories();
  category.name = name;
  category.id;

  categoryRepository.create(category);
  await categoryRepository.save(category);

  return category;
};

export default createCategoryService;
