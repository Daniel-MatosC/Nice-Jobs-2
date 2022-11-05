import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import listServiceUserService from "../../services/services/listServiceUser.service";

const listServiceUserController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const service = await listServiceUserService(id);

  if (!service) {
    throw new AppError("Service not found");
  }

  return response.status(200).json(service);
};

export default listServiceUserController;
