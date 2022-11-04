import { Description } from "../../entities/description.entity";
import { Categories } from "../../entities/categories.entity";

export interface IServiceRequest {
  serviceName: string;
  serviceOwner: string;
  isActive: boolean;
  description: Description;
  category: Categories;
}

export interface IService {
  id: string;
  serviceName: string;
  serviceOwner: string;
  isActive: boolean;
}
