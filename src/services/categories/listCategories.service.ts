import { Categories } from "../../entities/categories.entity";
import AppDataSource from "../../data-source";

const listCategoriesService = async () => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categories = await categoriesRepository.find();

  return categories;
};

export default listCategoriesService;
