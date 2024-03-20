import Express from "express";
import cors from "cors";
import { HttpAdapterPort, HttpRouteAdapterPort } from "@/ports/http";
import { DatabaseAdapterPort } from "@/ports/database";

export class ExpressHttpAdapter implements HttpAdapterPort {
  private readonly app: Express.Application;

  constructor(
    private readonly routes: HttpRouteAdapterPort<Express.Router>[],
    private readonly databaseAdapter: DatabaseAdapterPort
  ) {
    this.app = Express();
  }

  execute(): void {
    this.setupDatabase();
    this.setupMiddlewares();
    this.setupRoutes();
    this.app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  }

  private setupDatabase(): void {
    this.databaseAdapter
      .connect()
      .then(() => console.log("Database connected!"))
      .catch((e: any) => console.log("Error connection to database: ", e));
  }

  private setupMiddlewares(): void {
    this.app.use(Express.json());
    this.app.use(cors());
  }

  private setupRoutes(): void {
    this.routes.map((route: HttpRouteAdapterPort<Express.Router>) => {
      const router = Express.Router();
      route.setup(router);
      this.app.use(`/${route.name}`, router);
    });
  }
}
