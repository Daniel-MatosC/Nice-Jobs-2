import { Request, Response } from "express";
import updateServiceService from "../../services/services/updateService.service";
import { AppError } from "../../errors/appError";

const updateServiceController = async (req: Request, res: Response) => {
  const { serviceName, serviceOwner, description, categoryId } = req.body;
  const { id } = req.params;

  if (req.body.id != undefined || req.body.createdAt != undefined) {
    return res.status(401).json({
      error: "invalid field",
      message: "This field can not be updated!",
    });
  }

  const service = await updateServiceService({
    id,
    serviceName,
    serviceOwner,
    description,
    categoryId,
  });

  return res
    .status(200)
    .json({ message: "Service updated!", service: service });
};

export default updateServiceController;
