import { NextFunction, Request, Response } from "express";

export function imprimirPeticionesMiddleware(request: Request, response: Response, next: NextFunction) {
  console.log(`PEDIDO - ${request.method} ${request.url}`);

  next();
}