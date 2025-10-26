import dotenv from "dotenv";
import app from "./src/app.js";
import { setupDatabase } from "./src/models/models.js";

dotenv.config();

const serverPort = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await setupDatabase();
    
    app.listen(serverPort, () => {
      console.log(`Server started on port ${serverPort}`);
    })
  } catch (err) {
    console.error("Oh no! Server couldn't start:", err);
    process.exit(1);
  }
}

startServer();
