import express, { Application } from "express";
import routesTasks from "../routes/task.routes";
import routesUsers from "../routes/user.routes";
import connection from "../db/connection";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "4000";
    this.middlewares();
    this.routes();
    this.connectDB();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Aplicación corriendo en el puerto", this.port);
    });
  }

  routes() {
    this.app.use("/api/tasks", routesTasks);
    this.app.use("/api/users", routesUsers);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async connectDB() {
    try {
      await connection.connect();
      console.log("Conectado a la base de datos");
    } catch (err) {
      console.error("Error al conectar a la base de datos:", err);
      process.exit(1); // Para salir del proceso si no se puede conecta a la db
    }
  }
}

export default Server;
