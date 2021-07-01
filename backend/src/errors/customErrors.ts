type ErrorData = { [key: string]: any };

export class CustomError extends Error {
  constructor(
    public message: string,
    public code: string | number = "INTERNAL_ERROR",
    public status: number = 500,
    public data: ErrorData = {}
  ) {
    super();
  }
}

export class RouteNotFoundError extends CustomError {
  constructor(originalUrl: string) {
    super(`Route '${originalUrl}' does not exist.`, "ROUTE_NOT_FOUND", 404);
  }
}

export class EntityNotFoundError extends CustomError {
  constructor(entityText: string) {
    super(`${entityText}`, "ENTITY_NOT_FOUND", 404);
  }
}

export class InvalidTokenError extends CustomError {
  constructor(message = "Authentication token is invalid.") {
    super(message, "INVALID_TOKEN", 401);
  }
}

export class DatabaseError extends CustomError {
  constructor() {
    super("Something went wrong with the database.", "DATABASE_ERROR", 500);
  }
}

export class EntityAlreadyExistError extends CustomError {
  constructor(entityText: string, status = 409) {
    super(
      `${entityText} name already exists`,
      "ENTITY_ALREADY_CREATED",
      status
    );
  }
}

export class AuthorizationError extends CustomError {
  constructor(message = "Not authorized") {
    super(message, "NOT_AUTHORIZED", 401);
  }
}
