import { Request, Response } from "express";
import createServiceService from "../../services/services/createService.service";
import { AppError } from "../../errors/appError";

const createServiceController = async (req: Request, res: Response) => {
  try {
    const { serviceName, serviceOwner, isActive, description, category } =
      req.body;

    const newService = await createServiceService({
      serviceName,
      serviceOwner,
      isActive,
      description,
      category,
    });

    return res.status(201).send(newService);
  } catch (err) {
    if (err instanceof Error) {
      throw new AppError(err.message, 400);
    }
  }
};

export default createServiceController;
