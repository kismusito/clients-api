import app from "./app";
import connect from "./database";
import { CONFIG } from "./utils/config";

async function bootstrap(): Promise<void> {
  app.listen(CONFIG.PORT);
  await connect()
  console.log("App running");
}

bootstrap();
