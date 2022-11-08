import { Router } from "express";

const servicesRoutes = Router();

import createServiceController from "../controllers/services/createService.controller";
import listServicesController from "../controllers/services/listServices.controller";
import updateServiceController from "../controllers/services/updateService.controller";
import deleteServiceController from "../controllers/services/deleteService.controller";
import listServiceUserController from "../controllers/services/listServiceUser.controller";
import { ensureAuth } from "../middlewares/ensureAuth.middleware";

servicesRoutes.post("", ensureAuth, createServiceController);
servicesRoutes.get("", listServicesController);
servicesRoutes.patch("/:id",ensureAuth ,updateServiceController);
servicesRoutes.delete("/:id",ensureAuth, deleteServiceController);
servicesRoutes.get("/users/:id", listServiceUserController);

export default servicesRoutes;
