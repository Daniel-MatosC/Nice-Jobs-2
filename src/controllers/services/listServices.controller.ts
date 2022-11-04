import { Request, Response } from "express";
import listServicesService from "../../services/services/listServices.service";

const listServicesController = async (req: Request, res: Response) => {
  try {
    const services = await listServicesService();

    return res.send(services);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default listServicesController;
