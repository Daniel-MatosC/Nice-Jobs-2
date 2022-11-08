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
  password: "1234@Abc",
};

export const mockedService = {
  serviceName: "Manutenção em computadores",
  isActive: true,
  description: {
    serviceDescription: "Faço manutenção em computadores",
    serviceValue: 50,
  },
  category: "",
  user: "",
};

export const mockedServiceInvalidCategoryId = {
  serviceName: "Manutenção em computadores",
  isActive: true,
  description: {
    serviceDescription: "Faço manutenção em computadores",
    serviceValue: 50,
  },
  category: "fçlasdjfkladhfglagvknfjkgv",
  user: "",
};

export const mockedUserNotPremium = {
  name: "hassan",
  email: "hassan@gmail.com",
  password: "1234@Abc",
  isPremium: false,
  isOffering: false,
};
export const mockedUserPremium = {
  name: "hassan da silva",
  email: "hassansilva@gmail.com",
  password: "1234@Abc",
  isPremium: true,
  isOffering: false,
};

export const mockedUserPremiumTrue = {
  name: "Matheus",
  email: "matheus@gmail.com",
  password: "1234@Abc",
  isPremium: true,
  isOffering: true,
};
export const mockedUserPremiumAndOffering = {
  name: "hassan da silva junior",
  email: "hassansilvajunior@gmail.com",
  password: "1234@Abc",
  isPremium: true,
  isOffering: true,
};

export const mockedUserLogin = {
  email: "hassansilvajunior@gmail.com",
  password: "1234@Abc",
};

export const mockedPremiunLogin = {
  email: "hassansilva@gmail.com",
  password: "1234@Abc",
};

export const mockedSchedule = {
  date: "12/08/2022",
  hour: "10:30",
  serviceId: "",
  userId: "",
};

export const mockedScheduleInvalidHourLess8 = {
  date: "2022/08/17",
  hour: "5",
  serviceId: "",
  userId: "",
};

export const mockedScheduleInvalidHourMore22 = {
  date: "2022/08/17",
  hour: "23",
  serviceId: "",
  userId: "",
};

export const mockedScheduleInvalidServiceId = {
  date: "2022/08/12",
  hour: "10:30",
  serviceId: "b855d86b-d4c9-41cd-ab98-d7fa734c6ce4",
  userId: "",
};

export const mockedPremiunLoginTrue = {
  email: "matheus@gmail.com",
  password: "1234@Abc",
};
