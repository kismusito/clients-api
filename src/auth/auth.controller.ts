import * as express from "express";
import { Request, Response } from "express";
import type { Router } from "express";

import { AuthService } from "./auth.service";
import { loginValidator } from "./validators/login.validator";
import { registerValidator } from "./validators/register.validator";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  attach(): Router {
    const router = express.Router();
    return router
      .post("/login", loginValidator, this.login.bind(this))
      .post("/register", registerValidator, this.register.bind(this));
  }

  login(request: Request, response: Response) {
    return this.authService.login(request, response);
  }

  register(request: Request, response: Response) {
    return this.authService.register(request, response);
  }
}
