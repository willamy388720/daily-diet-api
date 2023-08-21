import { app } from "@/app";
import { create } from "./create";
import { verifyJWT } from "@/middlewares/verify-jwt";

export async function snackRoutes() {
  app.post("/snacks", { onRequest: [verifyJWT] }, create);
}
