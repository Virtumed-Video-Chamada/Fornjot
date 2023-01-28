import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { errors } from "celebrate";
import cors from "cors";
import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import routes from "./routes";
import rateLimiter from "./middlewares/rateLimiter";

import "@shared/infra/typeorm/index";
import "@shared/container";
import { httpServer } from "./routes/socket";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadsFolder));
//app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(process.env.PORT, () => {
  console.log("🚀 Server started on port http://localhost:3333");
});

