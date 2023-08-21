import { app } from "@/app";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { metrics } from "./metrics";

export async function userRoutes() {
  app.post("/signup", register);
  app.post("/signin", authenticate);

  app.patch("/token/refresh", refresh);

  app.get("/users/metrics", { onRequest: [verifyJWT] }, metrics);
}
