import { Router } from "express";

const servicesRoutes = Router();

import createServiceController from "../controllers/services/createService.controller";
import listServicesController from "../controllers/services/listServices.controller";

servicesRoutes.post("/services", createServiceController);
servicesRoutes.get("/services", listServicesController);

export default servicesRoutes;
