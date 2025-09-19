export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Corrige o prototype (necessário no TS para classes customizadas)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Recurso não encontrado") {
    super(message, 404);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Requisição inválida") {
    super(message, 400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Não autorizado") {
    super(message, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Acesso negado") {
    super(message, 403);
  }
}
