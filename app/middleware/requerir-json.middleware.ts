import { NextFunction, Request, Response } from 'express';

export function requerirJsonMiddleware(request: Request, response: Response, next: NextFunction) {
  if (!request.headers["content-type"] || request.headers["content-type"].toLowerCase() !== "application/json") { throw { estado: 400, mensaje: 'Se espera contenido JSON' }; }

  next();
}