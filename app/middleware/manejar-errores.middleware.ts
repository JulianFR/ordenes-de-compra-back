import { NextFunction, Request, Response } from "express";

export function manejarErroresMiddleware({ estado, mensaje, message }: any, request: Request, response: Response, next: NextFunction) {
  response.status(estado || 500).send(mensaje || message);
}