export class CustomError extends Error {
  constructor(message: any | undefined) {
    super(message);
  }
}

export class UnauthorizedError extends CustomError {
  statusCode: number;
  constructor(message: any | undefined) {
    super(message);
    this.statusCode = 401;
  }
}

export class BadRequestError extends CustomError {
  statusCode: number;
  constructor(message: any | undefined) {
    super(message);
    this.statusCode = 400;
  }
}

export class NotFoundError extends CustomError {
  statusCode: number;
  constructor(message: any | undefined) {
    super(message);
    this.statusCode = 404;
  }
}
