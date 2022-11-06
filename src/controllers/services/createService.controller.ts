import { Request, Response } from "express";
import createServiceService from "../../services/services/createService.service";

const createServiceController = async (req: Request, res: Response) => {
  const { serviceName, isActive, description, category, user } =
    req.body;

  const newService = await createServiceService({
    serviceName,
    isActive,
    description,
    category,
    user,
  });

  return res.status(201).send(newService);
};

export default createServiceController;
