import * as express from "express";
import type { Router, Request, Response } from "express";
import * as passport from "passport";
import { ClientService } from "./clients.service";
import { createClientValidator } from "./validators/create-client.validator";
import { updateClientValidator } from "./validators/update-client.validator";
import { adminMiddleware } from "../auth/middlewares/admin.middleware";

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  attach(): Router {
    const router = express.Router();
    return router
      .get(
        "/",
        passport.authenticate("jwt", { session: false }),
        this.getClients.bind(this)
      )
      .post(
        "/",
        passport.authenticate("jwt", { session: false }),
        createClientValidator,
        adminMiddleware,
        this.createClient.bind(this)
      )
      .patch(
        "/",
        passport.authenticate("jwt", { session: false }),
        updateClientValidator,
        adminMiddleware,
        this.updateClient.bind(this)
      )
      .delete(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        adminMiddleware,
        this.deleteClient.bind(this)
      );
  }

  private getClients(request: Request, response: Response): Promise<void> {
    return this.clientService.getClients(request, response);
  }

  private createClient(request: Request, response: Response): Promise<Response> {
    return this.clientService.createClient(request, response);
  }

  private updateClient(request: Request, response: Response): Promise<void> {
    return this.clientService.updateClient(request, response);
  }

  private deleteClient(request: Request, response: Response): Promise<void> {
    return this.clientService.deleteClient(request, response);
  }
}
