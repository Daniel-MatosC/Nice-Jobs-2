import { IScheduleRequest } from './../../interfaces/schedules/index';
import { ICategoryRequest } from "../../interfaces/categories";

import { IUserLogin,IUserRequest } from "../../interfaces/users";
import { IServiceRequest } from '../../interfaces/services';

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

export const mockedService:IServiceRequest = {
  serviceName: "Manutenção em computadores",
  isActive: true,
  description: {
    serviceDescription: "Faço manutenção em computadores",
    serviceValue: 50,
  },
  category: "",
  user: "",
};

export const mockedServiceInvalidCategoryId:IServiceRequest = {
  serviceName: "Manutenção em computadores",
  isActive: true,
  description: {
    serviceDescription: "Faço manutenção em computadores",
    serviceValue: 50,
  },
  category: "13970660-5dbe-423a-9a9d-5c23b37943cf",
  user: "",
};

export const mockedServiceInvalidUserId :IServiceRequest= {
  serviceName: "Manutenção em computadores",
  isActive: true,
  description: {
    serviceDescription: "Faço manutenção em computadores",
    serviceValue: 50,
  },
  category: "",
  user: "13970660-5dbe-423a-9a9d-5c23b37943cf",
};

export const mockedUserNotPremium:IUserRequest = {
  name: "hassan",
  email: "hassan@gmail.com",
  password: "1234@Abc",
  isPremium: false,
  isOffering: false,
};
export const mockedUserInvalidEmail:IUserRequest = {
  name: "hassan",
  email: "hassagmail.com",
  password: "1234@Abc",
  isPremium: false,
  isOffering: false,
};
export const mockedUserInvalidPassword:IUserRequest = {
  name: "hassan",
  email: "hassa@gmail.com",
  password: "1234Abc",
  isPremium: false,
  isOffering: false,
};
export const mockedUserPremium :IUserRequest= {
  name: "hassan da silva",
  email: "hassansilva@gmail.com",
  password: "1234@Abc",
  isPremium: true,
  isOffering: false,
};

export const mockedUserPremiumTrue:IUserRequest = {
  name: "Matheus",
  email: "matheus@gmail.com",
  password: "1234@Abc",
  isPremium: true,
  isOffering: true,
};
export const mockedUserPremiumAndOffering:IUserRequest = {
  name: "hassan da silva junior",
  email: "hassansilvajunior@gmail.com",
  password: "1234@Abc",
  isPremium: true,
  isOffering: true,
};

export const mockedUserLogin:IUserLogin = {
  email: "hassansilvajunior@gmail.com",
  password: "1234@Abc",
};

export const mockedPremiunLogin:IUserLogin = {
  email: "hassansilva@gmail.com",
  password: "1234@Abc",
};

export const mockedSchedule:IScheduleRequest = {
  date: "12/08/2022",
  hour: "10:30",
  serviceId: "",
  userId: "",
};
export const mockedScheduleHourInvalid:IScheduleRequest = {
  date: "12/08/2022",
  hour: "10:30:101010",
  serviceId: "",
  userId: "",
};

export const mockedScheduledateInvalid:IScheduleRequest = {
  date: "12/08/2022222",
  hour: "10:30:101010",
  serviceId: "",
  userId: "",
};

export const mockedScheduledateEmpty:IScheduleRequest = {
  date: "",
  hour: "10:30:10",
  serviceId: "",
  userId: "",
};
export const mockedScheduleHourEmpty:IScheduleRequest = {
  date: "10:10",
  hour: "",
  serviceId: "",
  userId: "",
};

export const mockedScheduleInvalidHourLess8:IScheduleRequest = {
  date: "2022/08/17",
  hour: "5",
  serviceId: "",
  userId: "",
};

export const mockedScheduleInvalidHourMore22:IScheduleRequest = {
  date: "2022/08/17",
  hour: "23",
  serviceId: "",
  userId: "",
};

export const mockedScheduleInvalidServiceId:IScheduleRequest = {
  date: "2022/08/12",
  hour: "10:30",
  serviceId: "b855d86b-d4c9-41cd-ab98-d7fa734c6ce4",
  userId: "",
};

export const mockedPremiunLoginTrue:IUserLogin = {
  email: "matheus@gmail.com",
  password: "1234@Abc",
};
