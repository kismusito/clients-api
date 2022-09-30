import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MESSAGE_HANDLER } from "src/utils/enums/message-handler";
import { ROL } from "src/utils/enums/roles";
import { RequestUser } from "../types/request-user.type";

export const adminMiddleware = (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (user.rol !== ROL.ADMINISTRATOR) {
    res.status(StatusCodes.FORBIDDEN).json({
      message: MESSAGE_HANDLER.FORBIDDEN_RESOURCE,
    });
  }

  next();
};
