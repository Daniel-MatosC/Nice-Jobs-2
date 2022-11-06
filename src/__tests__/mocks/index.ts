import { ICategoryRequest } from "../../interfaces/categories";

import { IUserLogin } from "../../interfaces/users";

export const mockedCategory: ICategoryRequest = {
  name: "Manutenção",
};

export const mockedAdminLogin: IUserLogin = {
  email: "felipe@mail.com",
  password: "123456",
};

export const mockedService = {
  serviceName: "Manutenção em computadores",
  serviceOwner: "Matheus",
  isActive: true,
  description: {
    serviceDescription: "Faço manutenção em computadores",
    serviceValue: 50,
    atuationArea: "Manutenção",
  },
  categoryId: "431b5dfb-35fe-4b49-9078-548c95d5c63c",
  user: "24b4cb28-37bf-4afd-998b-7551d6bd2159",
};
