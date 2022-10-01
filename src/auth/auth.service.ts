import { Request, Response } from "express";
import { User } from "./models/user.model";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { MESSAGE_HANDLER } from "../utils/enums/message-handler";
import { TextEncrypt } from "../utils/helpers/encryptor";
import { JWTGenerator } from "./passport/jwt-generator";
import { rolPermissions } from "./rol-permissions";

export class AuthService {
  private userRepository: typeof User;

  constructor() {
    this.userRepository = User;
  }

  async login(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const textEncrypt = new TextEncrypt(password);

      const userByEmail = await this.userRepository.findOne({ email });
      if (!userByEmail) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: MESSAGE_HANDLER.INVALID_CREDENTIALS });
      }

      const comparePasswords = await textEncrypt.compare(userByEmail.password);
      if (!comparePasswords) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: MESSAGE_HANDLER.INVALID_CREDENTIALS });
      }

      const jwtGenerator = new JWTGenerator(userByEmail);
      return response.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        token: jwtGenerator.generateToken(),
        permissions: rolPermissions[userByEmail.rol],
      });
    } catch (error) {
      return response
        .status(StatusCodes.BAD_GATEWAY)
        .json({ error: error.message });
    }
  }

  async register(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password, username } = request.body;

      const userByEmail = await this.userRepository.findOne({ email });
      if (userByEmail) {
        return response.status(StatusCodes.BAD_REQUEST).json({
          message: MESSAGE_HANDLER.EMAIL_ALREADY_TAKEN,
        });
      }

      const userByUsername = await this.userRepository.findOne({ username });
      if (userByUsername) {
        return response.status(StatusCodes.BAD_REQUEST).json({
          message: MESSAGE_HANDLER.USERNAME_ALREADY_TAKEN,
        });
      }

      const user = new this.userRepository({ email, password, username });
      await user.save();

      return response
        .status(StatusCodes.CREATED)
        .json({ message: ReasonPhrases.CREATED });
    } catch (error) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
