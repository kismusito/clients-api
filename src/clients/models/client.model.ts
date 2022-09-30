import { model } from "mongoose";
import { ClientSchema } from "../schemas/client.schema";
import { ClientData } from "../types/client-data.type";

export const Client = model<ClientData>("Client", ClientSchema);
