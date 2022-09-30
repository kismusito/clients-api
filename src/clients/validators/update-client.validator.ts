import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "src/utils/helpers/validator";

export const updateClientValidator = [
  check("_id").exists().not().isEmpty(),
  check("name").optional().not().isEmpty(),
  check("email").optional().isEmail().not().isEmpty(),
  check("document").optional().isNumeric().not().isEmpty(),
  check("bankAccount").optional().isNumeric().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
