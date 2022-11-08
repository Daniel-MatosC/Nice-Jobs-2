import { Request, Response } from "express";
import createServiceService from "../../services/services/createService.service";

const createServiceController = async (req: Request, res: Response) => {
  const { serviceName, isActive, description, category, user } =
    req.body;
    const req_user = req.user.isOffering!;

  const newService = await createServiceService({
    serviceName,
    isActive,
    description,
    category,
    user,
    req_user
  });

  return res.status(201).send(newService);
};

export default createServiceController;
