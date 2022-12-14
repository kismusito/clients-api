import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { MESSAGE_HANDLER } from "../utils/enums/message-handler";

import { Client } from "./models/client.model";

export class ClientService {
  private clientRepository: typeof Client;

  constructor() {
    this.clientRepository = Client;
  }

  async getClients(request: Request, response: Response): Promise<Response> {
    try {
      const clients = await this.clientRepository.find();
      return response.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        clients,
      });
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
        message: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async createClient(request: Request, response: Response): Promise<Response> {
    try {
      const { email, name, bankAccount, document } = request.body;

      const clientByEmail = await this.clientRepository.findOne({ email });
      if (clientByEmail) {
        return response.status(StatusCodes.BAD_REQUEST).json({
          message: MESSAGE_HANDLER.EMAIL_ALREADY_TAKEN,
        });
      }

      const clientByDocument = await this.clientRepository.findOne({
        document,
      });
      if (clientByDocument) {
        return response.status(StatusCodes.BAD_REQUEST).json({
          message: MESSAGE_HANDLER.DOCUMENT_ALREADY_TAKEN,
        });
      }

      const client = new this.clientRepository({
        email,
        name,
        bankAccount,
        document,
      });

      const savedClient = await client.save();

      return response.status(StatusCodes.CREATED).json({
        message: MESSAGE_HANDLER.CLIENT_CREATED,
        client: savedClient,
      });
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
        message: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async updateClient(request: Request, response: Response): Promise<Response> {
    try {
      const { email, name, bankAccount, document, _id } = request.body;

      const clientById = await this.clientRepository.findOne({ _id });
      if (!clientById) {
        return response.status(StatusCodes.BAD_REQUEST).json({
          message: MESSAGE_HANDLER.CLIENT_NOT_FOUND,
        });
      }

      if (email && email !== clientById.email) {
        const clientByEmail = await this.clientRepository.findOne({ email });
        if (clientByEmail) {
          return response.status(StatusCodes.BAD_REQUEST).json({
            message: MESSAGE_HANDLER.EMAIL_ALREADY_TAKEN,
          });
        }
      }

      if (document && document !== clientById.document) {
        const clientByDocument = await this.clientRepository.findOne({
          document,
        });
        if (clientByDocument) {
          return response.status(StatusCodes.BAD_REQUEST).json({
            message: MESSAGE_HANDLER.DOCUMENT_ALREADY_TAKEN,
          });
        }
      }

      if (email) {
        clientById.email = email;
      }

      if (name) {
        clientById.name = name;
      }

      if (bankAccount) {
        clientById.bankAccount = bankAccount;
      }

      if (document) {
        clientById.document = document;
      }

      const savedClient = await clientById.save();

      return response.status(StatusCodes.OK).json({
        client: savedClient,
        message: MESSAGE_HANDLER.CLIENT_UPDATED,
      });
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
        message: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async deleteClient(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const clientById = await this.clientRepository.findOne({ _id: id });
      if (!clientById) {
        return response.status(StatusCodes.BAD_REQUEST).json({
          message: MESSAGE_HANDLER.CLIENT_NOT_FOUND,
        });
      }

      await clientById.remove();

      return response.status(StatusCodes.OK).json({
        client: clientById,
        message: MESSAGE_HANDLER.CLIENT_DELETED,
      });
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
        message: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
