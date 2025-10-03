import { Router } from "express";
import {
  addDocumentToProjectController,
  createFinalProjectController,
  createProjectController,
  deleteProjectController,
  generateDocumentController,
  generateTasksController,
  getDashboardDataFun,
  getProjectController,
  getProjectsController,
  identifyKeyFeaturesController,
  initProjectController,
  removeDocumentFromProjectController,
  updateProjectController,
} from "../../controllers/project.controller";
import { asyncHandler } from "../../utils/route_wrapper";
import { verify } from "jsonwebtoken";
import { verifyToken } from "../../middlewares/auth_middleware";
import { researchController } from "../../controllers/research.controller";

const projectRouter = Router();


projectRouter.post("/init-project", asyncHandler(initProjectController));

projectRouter.post("/identify-key-features", asyncHandler(identifyKeyFeaturesController));

projectRouter.post("/generate-document", asyncHandler(generateDocumentController));

projectRouter.post("/generate-tasks", asyncHandler(generateTasksController));

projectRouter.post("/create-project", asyncHandler(createFinalProjectController));

projectRouter.post("/create", asyncHandler(createProjectController));

projectRouter.get("/all/:ownerId", asyncHandler(getProjectsController));

projectRouter.get("/dashboard/:ownerId", asyncHandler(getDashboardDataFun));

projectRouter.put("/:projectId", asyncHandler(updateProjectController));

projectRouter.get("/:projectId", asyncHandler(getProjectController));
projectRouter.get("/employees/:projectId",verifyToken, asyncHandler(getProjectController));

projectRouter.delete("/:projectId", asyncHandler(deleteProjectController));

projectRouter.post("/research", asyncHandler(researchController));

projectRouter.post(
  "/add-document",
  asyncHandler(addDocumentToProjectController)
);

projectRouter.post(
  "/remove-document",
  asyncHandler(removeDocumentFromProjectController)
);

export default projectRouter;
