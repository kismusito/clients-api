import * as express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import * as cors from "cors";

import { AuthController } from "./auth/auth.controller";
import { CONFIG } from "./utils/config";
import { PassportConfig } from "./auth/passport";
import { ClientController } from "./clients/clients.controller";

const app = express();

const passportConfig = new PassportConfig();
passportConfig.init();

app.use(bodyParser.json());

app.use(cors());
app.use(helmet());

app.use(`${CONFIG.API_ROUTE}/auth`, new AuthController().attach());
app.use(`${CONFIG.API_ROUTE}/clients`, new ClientController().attach());

export default app;
