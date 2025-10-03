import prisma from "../db";
import { compare, hash } from "../utils/scrypt";
import { sendCredentialsEmail } from "./mail.service";

export const createEmployee = async (
  name: string,
  email: string,
  contact: string,
  role: string,
  skills: string[],
  status: string,
  location: string,
  ownerId: string,
  department: string,
  githubUsername: string
) => {
  const admin = await prisma.admin.findFirst({
    where: {
      id: ownerId,
    },
    select: {
      remainginEmployeeLimit: true,
      subscription: true,
    },
  });
  if (!admin) {
    throw new Error("Admin with this id does not exist");
  }
  // else if (
  //   admin.subscription?.planId != "pro" &&
  //   admin.remainginEmployeeLimit == 0
  // ) {
  //   throw new Error("Employee limit reached");
  // }

  if (
    (admin.subscription?.status === "pending" ||
      admin.subscription?.status === "cancelled") &&
    admin.subscription?.planId === "pro"
  ) {
    throw new Error("Subscription is pending");
  }
  // const password = Math.random().toString(36).slice(-8);
  const password = "123456789";
  console.log("password", password);

  const hashedPassword = await hash(password);
  console.log(password);
  console.log(hashedPassword);

  const temp = await prisma.admin.findFirst({
    where: {
      id: ownerId,
    },
    select: {
      id: true,
      remainginEmployeeLimit: true,
      subscription: true,
    },
  });
  if (!temp) {
    throw new Error("Admin with this id does not exist");
  }

  const employee = await prisma.employee.create({
    data: {
      name,
      email,
      contact,
      role,
      skills,
      status,
      location,
      createdAt: new Date(),
      employerId: ownerId,
      department,
      password: hashedPassword,
      githubUsername,
    },
  });

  if (!employee) {
    throw new Error("Employee creation failed");
  } else if (temp.subscription?.planId != "pro") {
    await prisma.admin.update({
      where: { id: employee.employerId },
      data: {
        remainginEmployeeLimit: {
          decrement: 1,
        },
      },
    });
  }

  const { password: _, ...employeeWithoutPassword } = employee;

  // var res = await sendCredentialsEmail(
  //   employee.email,
  //   employee.name,
  //   employee.email,
  //   password
  // );
  // if (!res) {
  //   throw new Error("Email sent failed");
  // }
  // console.log(res);

  return employeeWithoutPassword;
};

export const getEmployeeDashboard = async (employeeId: string) => {
  const projects = await prisma.project.findMany({
    where: { employeesWorkingOn: { some: { id: employeeId } } },
    select: {
      id: true,
      name: true,
      description: true,
      ownerId: true,
      projectType: true,
      createdAt: true,
      updatedAt: true,
      completionStatus: true,
      timeEstimate: true,

      employeesWorkingOn: {
        select: {
          name: true,
          id: true,
        },
      },
      tasks: {
        select: {
          id: true,
          status: true,
        },
      },
    },
  });

  return projects;
};

export const getEmployees = async (ownerId: string) => {
  const temp = await prisma.admin.findFirst({
    where: {
      id: ownerId,
    },
  });
  if (!temp) {
    throw new Error("Admin with this id does not exist");
  }
  const employees = await prisma.employee.findMany({
    where: {
      employerId: ownerId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      contact: true,
      role: true,
      skills: true,
      status: true,
      location: true,
      createdAt: true,
      updatedAt: true,
      employerId: true,
      projectsAssigned: true,
      assignedTasks: true,
      department: true,
      githubUsername: true,
    },
  });

  return employees;
};

export const employeeLogin = async (email: string, password: string) => {
  const employee = await prisma.employee.findFirst({
    where: {
      email,
    },
  });

  if (!employee) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await compare(password, employee.password);

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const { password: _, ...employeeWithoutPassword } = employee;
  return employeeWithoutPassword;
};

export const resetPassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const employee = await prisma.employee.findFirst({
    where: {
      email: email,
    },
  });
  if (!employee) {
    throw new Error("Employee with this id does not exist");
  }
  const passwordMatch = await compare(oldPassword, employee.password);
  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }
  const hashedPassword = await hash(newPassword);
  const updatedEmployee = await prisma.employee.update({
    where: {
      id: employee.id,
    },
    data: {
      password: hashedPassword,
      updatedAt: new Date(),
    },
  });
  const { password: _, ...employeeWithoutPassword } = updatedEmployee;
  return employeeWithoutPassword;
};

export const updateEmployee = async (
  employeeId: string,
  name: string,
  email: string,
  contact: string,
  role: string,
  skills: string[],
  status: string,
  location: string,
  department: string
) => {
  const temp = await prisma.employee.findFirst({
    where: {
      id: employeeId,
    },
  });
  if (!temp) {
    throw new Error("Employee with this id does not exist");
  }

  const employee = await prisma.employee.update({
    where: {
      id: employeeId,
    },
    data: {
      name,
      email,
      contact,
      role,
      skills,
      status,
      location,
      department,
      updatedAt: new Date(),
    },
  });
  return employee;
};

export const getSingleEmployee = async (employeeId: string) => {
  const temp = await prisma.employee.findFirst({
    where: {
      id: employeeId,
    },
  });
  if (!temp) {
    throw new Error("Employee with this id does not exist");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      id: employeeId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      contact: true,
      role: true,
      skills: true,
      status: true,
      location: true,
      createdAt: true,
      updatedAt: true,
      projectsAssigned: true,
      assignedTasks: true,
      employerId: true,
      department: true,
      githubUsername: true,
    },
  });
  return employee;
};

export const deleteEmployee = async (employeeId: string) => {
  const temp = await prisma.employee.findFirst({
    where: {
      id: employeeId,
    },
  });
  if (!temp) {
    throw new Error("Employee with this id does not exist");
  }

  const employee = await prisma.employee.delete({
    where: {
      id: employeeId,
    },
  });
  return employee;
};

export const addProjectToEmployee = async (
  employeeId: string,
  projectId: string
) => {
  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
  });

  if (!employee) {
    throw new Error(`Employee with ID "${employeeId}" does not exist`);
  }

  const project = await prisma.project.findFirst({
    where: { id: projectId },
  });

  if (!project) {
    throw new Error(`Project with ID "${projectId}" does not exist`);
  }
  const updatedEmployee = await prisma.employee.update({
    where: { id: employeeId },
    data: {
      projectsAssigned: {
        connect: { id: projectId },
      },
    },
  });

  return updatedEmployee;
};

export const removeProjectFromEmployee = async (
  employeeId: string,
  projectId: string
) => {
  const temp = await prisma.employee.findUnique({
    where: {
      id: employeeId,
    },
  });
  if (!temp) {
    throw new Error("Employee with this id does not exist");
  }

  const employee = await prisma.employee.update({
    where: {
      id: employeeId,
    },
    data: {
      projectsAssigned: {
        disconnect: {
          id: projectId,
        },
      },
    },
  });
  return employee;
};

export const addTaskToEmployee = async (employeeId: string, taskId: string) => {
  const temp = await prisma.employee.findUnique({
    where: { id: employeeId },
  });

  if (!temp) {
    throw new Error(`Employee with ID "${employeeId}" does not exist`);
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new Error(`Task with ID "${taskId}" does not exist`);
  }

  const employee = await prisma.employee.update({
    where: {
      id: employeeId,
    },
    data: {
      assignedTasks: {
        connect: {
          id: taskId,
        },
      },
    },
  });
  return employee;
};

export const removeTaskFromEmployee = async (
  employeeId: string,
  taskId: string
) => {
  const temp = await prisma.employee.findFirst({
    where: {
      id: employeeId,
    },
  });
  if (!temp) {
    throw new Error("Employee with this id does not exist");
  }

  const employee = await prisma.employee.update({
    where: {
      id: employeeId,
    },
    data: {
      assignedTasks: {
        disconnect: {
          id: taskId,
        },
      },
    },
  });
  return employee;
};

export const addCommentToTask = async (
  taskId: string,
  comment: string,
  commentorId: string
) => {
  const temp = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!temp) {
    throw new Error("Task with this id does not exist");
  }

  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      comments: {
        create: {
          text: comment,
          commentorId: commentorId,
          projectId: temp.projectId,
        },
      },
    },
    select: {
      comments: {
        select: {
          createdAt: true,
          text: true,
          commentor: true,
        },
      },
    },
  });

  return task;
};
