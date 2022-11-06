import { IServicesOnCategory } from "./../../interfaces/categories/index";
import { Services } from "./../../entities/services.entity";
import { Categories } from "../../entities/categories.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { LimitOnUpdateNotSupportedError } from "typeorm";

const listCategoriesService = async (id: IServicesOnCategory) => {
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const ServicesRepository = AppDataSource.getRepository(Services);

  const category = await categoriesRepository.findOneBy(id);

  if (!category) {
    throw new AppError("Category not found");
  }

  const servicesAll = await ServicesRepository.find({
    relations: {
      category: true,
    },
  });

  const service = servicesAll.filter((service) => {
    return service.category.id === category.id;
  });

  return service;
};

export default listCategoriesService;
