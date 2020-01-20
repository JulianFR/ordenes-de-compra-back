import { NextFunction, Request, Response } from "express";

export default function corsMiddleware(request: Request, response: Response, next: NextFunction) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-control-Allow-Methods", "POST");
  response.setHeader("Access-control-Allow-Headers", "Content-Type");
  next();
};