import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../../utils/helpers/validator";

export const createClientValidator = [
  check("name").exists().not().isEmpty(),
  check("email").exists().isEmail().not().isEmpty(),
  check("document").exists().isNumeric().not().isEmpty(),
  check("bankAccount").exists().isNumeric().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
