import type { Request, Response } from "express";

export const logger = (req: Request, res: Response, next: Function) => {
  const methodColors: { [key: string]: string } = {
    GET: "\x1b[32m",
    POST: "\x1b[34m",
    PUT: "\x1b[33m",
    DELETE: "\x1b[31m",
  };

  const color = methodColors[req.method] || "\x1b[37m";
  console.log(
    `${color}${req.method} ${req.protocol}://${req.get("host")}${
      req.originalUrl
    }\x1b[0m`
  );
  next();
};

module.exports = logger;
