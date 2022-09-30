import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "src/utils/helpers/validator";

export const registerValidator = [
  check("email").exists().isEmail().not().isEmpty(),
  check("password").exists().not().isEmpty(),
  check("username").exists().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
