import { Router } from "express";

const servicesRoutes = Router();

import createServiceController from "../controllers/services/createService.controller";
import listServicesController from "../controllers/services/listServices.controller";
import updateServiceController from "../controllers/services/updateService.controller";
import deleteServiceController from "../controllers/services/deleteService.controller";
import listServiceUserController from "../controllers/services/listServiceUser.service";

servicesRoutes.post("/services", createServiceController);
servicesRoutes.get("/services", listServicesController);
servicesRoutes.patch("/services/:id", updateServiceController);
servicesRoutes.delete("/services/:id", deleteServiceController);
servicesRoutes.get("/services/:id", listServiceUserController);

export default servicesRoutes;
