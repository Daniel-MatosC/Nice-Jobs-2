import { ICategoryRequest } from "../../interfaces/categories";

import { IUserLogin } from "../../interfaces/users";

export const mockedCategory: ICategoryRequest = {
  name: "Manutenção",
};
export const mockedCategory2: ICategoryRequest = {
  name: "Bolo",
};

export const mockedAdminLogin: IUserLogin = {
  email: "felipe@mail.com",
  password: "123456",
};

export const mockedService = {
  serviceName: "Manutenção em computadores",
  isActive: true,
  description: {
    serviceDescription: "Faço manutenção em computadores",
    serviceValue: 50,
  },
  categoryId: "",
  user: "",
};

export const mockedUserNotPremium = {
  name: "hassan",
  email: "hassan@gmail.com",
  password: "123456",
  isPremium: false,
  isOffering: false,
};
export const mockedUserPremium = {
  name: "hassan da silva",
  email: "hassansilva@gmail.com",
  password: "123456",
  isPremium: true,
  isOffering: false,
};
export const mockedUserPremiumAndOffering = {
  name: "hassan da silva junior",
  email: "hassansilvajunior@gmail.com",
  password: "123456",
  isPremium: true,
  isOffering: true,
};

export const mockedUserLogin = {
  email: "joana@mail.com",
  password: "123456",
};

export const mockedPremiunLogin = {
  email: "hassansilva@gmail.com",
  password: "123456",
};
