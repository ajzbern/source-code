import { Router } from "express";
import {
  createDocumentController,
  deleteDocumentController,
  getDocumentsController,
  getSingleDocumentController,
  updateDocumentController,
} from "../../controllers/document.controller";
import { asyncHandler } from "../../utils/route_wrapper";
import { verifyToken } from "../../middlewares/auth_middleware";

const documentRouter = Router();

documentRouter.post("/create", asyncHandler(createDocumentController));

documentRouter.get("/project/:ownerId", asyncHandler(getDocumentsController));

documentRouter.get("/:documentId", asyncHandler(getSingleDocumentController));

documentRouter.get(
  "/employees/:documentId",
  verifyToken,
  asyncHandler(getSingleDocumentController)
);

documentRouter.put("/:documentId", asyncHandler(updateDocumentController));

documentRouter.delete("/:documentId", asyncHandler(deleteDocumentController));

export default documentRouter;
