export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isPremium: boolean;
  isOffering: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  isOffering: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  isPremium?: boolean;
  isOffering?: boolean;
}
