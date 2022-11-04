import { Request, Response } from "express";
import listServicesService from "../../services/services/listServices.service";

const listServicesController = async (req: Request, res: Response) => {
  const services = await listServicesService();

  return res.status(200).json(services);
};

export default listServicesController;
