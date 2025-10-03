import { Router, Request, Response } from "express";
import { CreateDocumentSchema, UpdateDocumentSchema } from "../types";
import {
  createDocument,
  deleteDocument,
  getDocuments,
  getSingleDocument,
  updateDocument,
} from "../services/document.service";
export const createDocumentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = CreateDocumentSchema.parse(req.body);
    const document = await createDocument(
      validatedData.projectId,
      validatedData.description ?? "",
      validatedData.status ?? "",
      validatedData.body ?? "",
      validatedData.createdBy ?? "",
      validatedData.name ?? "",
      validatedData.ownerId ?? ""
    );
    res.status(201).json({
      success: true,
      message: "Document created successfully",
      data: document,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getDocumentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const documents = await getDocuments(req.params.ownerId);
    res.status(200).json({
      success: true,
      message: "Documents retrieved successfully",
      data: documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateDocumentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = UpdateDocumentSchema.parse(req.body);
    const document = await updateDocument(
      req.params.documentId,
      validatedData.description ?? "",
      validatedData.name ?? "",
      validatedData.status ?? "",
      validatedData.body ?? "",
      validatedData.ownerId ?? ""
    );
    res.status(200).json({
      success: true,
      message: "Document updated successfully",
      data: document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteDocumentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteDocument(req.params.documentId);
    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getSingleDocumentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const document = await getSingleDocument(req.params.documentId);
    res.status(200).json({
      success: true,
      message: "Document retrieved successfully",
      data: document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
