import prisma from "../db";

export const createDocument = async (
  projectId: string,
  name: string,
  description: string,
  status: string,
  body: string,
  createdBy: string,
  ownerId: string
) => {
  const admin = await prisma.admin.findFirst({
    where: {
      id: ownerId,
    },
    select: {
      id: true,
      name: true,
      remainingDocumentLimit: true,
    },
  });
  if (!admin) {
    throw new Error("User with this id does not exist");
  }

  // if (admin.remainingDocumentLimit <= 0) {
  //   throw new Error("You have reached your document limit");
  // }

  const temp = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
  });
  if (!temp) {
    throw new Error("Project with this id does not exist");
  }

  const document = await prisma.document.create({
    data: {
      description,
      status,
      body,
      projectId,
      createdBy,
      updatedAt: new Date(),
      name: name,
      ownerId,
    },
  });
  return document;
};

export const getDocuments = async (ownerId: string) => {
  const temp = await prisma.project.findFirst({
    where: {
      ownerId: ownerId,
    },
  });
  if (!temp) {
    throw new Error("Project with this id does not exist");
  }

  const documents = await prisma.document.findMany({
    where: {
      ownerId,
    },
    select: {
      id: true,
      description: true,
      status: true,
      body: true,
      createdBy: true,
      createdAt: true,
      updatedAt: true,
      project: true,
      projectId: true,
      views: true,
      name: true,
    },
  });
  return documents;
};

export const updateDocument = async (
  documentId: string,
  description: string,
  name: string,
  status: string,
  body: string,
  ownerId: string
) => {
  const admin = await prisma.admin.findFirst({
    where: {
      id: ownerId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!admin) {
    throw new Error("User with this id does not exist");
  }

  const temp = await prisma.document.findFirst({
    where: {
      id: documentId,
    },
  });
  if (!temp) {
    throw new Error("Document with this id does not exist");
  }

  const document = await prisma.document.update({
    where: {
      id: documentId,
    },
    data: {
      description,
      status,
      body,
      createdBy: admin.name,
      updatedAt: new Date(),
      name,
      ownerId,
    },
    select: {
      id: true,
      description: true,
      status: true,
      body: true,
      docBody: true,
      createdBy: true,
      createdAt: true,
      updatedAt: true,
      project: true,
      views: true,
      projectId: true,
      name: true,
      ownerId: true,
    },
  });
  return document;
};

export const getSingleDocument = async (documentId: string) => {
  const temp = await prisma.document.findFirst({
    where: {
      id: documentId,
    },
  });
  if (!temp) {
    throw new Error("Document with this id does not exist");
  }
  await prisma.document.update({
    where: {
      id: documentId,
    },
    data: {
      views: temp.views + 1,
    },
  });

  const document = await prisma.document.findUnique({
    where: {
      id: documentId,
    },
    select: {
      id: true,
      description: true,
      status: true,
      docBody: true,
      docDesc: true,
      docName: true,
      erDiagram: true,
      useCaseDiagram: true,
      body: true,
      createdBy: true,
      createdAt: true,
      updatedAt: true,
      project: true,
      views: true,
      projectId: true,
      name: true,
      ownerId: true,
    },
  });
  return document;
};

export const deleteDocument = async (documentId: string) => {
  const temp = await prisma.document.findFirst({
    where: {
      id: documentId,
    },
  });
  if (!temp) {
    throw new Error("Document with this id does not exist");
  }

  const document = await prisma.document.delete({
    where: {
      id: documentId,
    },
  });
  return document;
};
