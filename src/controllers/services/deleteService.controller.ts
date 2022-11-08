import { Request, Response } from "express";
import deleteServiceService from "../../services/services/deleteService.service";
import { AppError } from "../../errors/appError";

const deleteServiceController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const service = await deleteServiceService({
      id,
    });

    return res.status(200).json({ message: "Service deleted!" });
  } catch (err) {
    if (err instanceof Error) {
      throw new AppError(err.message, 400);
    }
  }
};

export default deleteServiceController;
