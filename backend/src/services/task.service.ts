import prisma from "../db";

export const createTask = async (
  projectId: string,
  name: string,
  description: string,
  tag: string,
  status: string,
  priority: string,
  ownerId: string
) => {
  const temp = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
  });
  if (!temp) {
    throw new Error("Project with this id does not exist");
  }

  const task = await prisma.task.create({
    data: {
      name,
      description,
      tag,
      status,
      priority,
      projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId,
    },
  });
  return task;
};

export const getTasks = async (ownerId: string) => {
  const temp = await prisma.project.findFirst({
    where: {
      ownerId: ownerId,
    },
  });
  if (!temp) {
    throw new Error("Project with this id does not exist");
  }

  const tasks = await prisma.task.findMany({
    where: {
      ownerId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      tag: true,
      status: true,
      priority: true,
      assignedEmployees: true,
      createdAt: true,
      updatedAt: true,
      project: true,
      projectId: true,
      ownerId: true,
      comments: true,
    },
  });

  return tasks;
};

export const updateTask = async (
  taskId: string,
  name: string,
  description: string,
  tag: string,
  status: string,
  priority: string,
  ownerId: string
) => {
  const temp = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
  });
  if (!temp) {
    throw new Error("Task with this id does not exist");
  }
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      name,
      description,
      tag,
      status,
      priority,
      updatedAt: new Date(),
      ownerId,
    },
  });

  const project = await prisma.project.update({
    where: {
      id: task.projectId,
    },
    data: {
      completionStatus: "IN_PROGRESS",
      updatedAt: new Date(),
    },
  });

  if (!project) {
    throw new Error("Project with this id does not exist");
  }

  return task;
};

export const getSingleTask = async (taskId: string) => {
  const temp = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
  });
  if (!temp) {
    throw new Error("Task with this id does not exist");
  }

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      tag: true,
      status: true,
      priority: true,
      assignedEmployees: true,
      createdAt: true,
      updatedAt: true,
      project: true,
      projectId: true,
      ownerId: true,
    },
  });
  return task;
};

export const deleteTask = async (taskId: string) => {
  const temp = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
  });
  if (!temp) {
    throw new Error("Task with this id does not exist");
  }

  const task = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  return task;
};
