import { Description } from "../../entities/description.entity";
import { User } from "../../entities/user.entity";

export interface IServiceRequest {
  serviceName: string;
  isActive: boolean;
  description: Description;
  category: string;
  user: string;
}

export interface IService {
  id: string;
  serviceName: string;
  serviceOwner: string;
  isActive: boolean;
}

export interface IDescription {
  serviceDescription: string;
  serviceValue: number;
  atuationArea: string;
}

export interface IServiceUpdate {
  serviceName: string;
  serviceOwner: string;
  description: Description;
  categoryId: string;
  id: string;
}

export interface IServiceDelete {
  id: string;
}
