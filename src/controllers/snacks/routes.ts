import { app } from "@/app";
import { create } from "./create";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { update } from "./update";

export async function snackRoutes() {
  app.post("/snacks", { onRequest: [verifyJWT] }, create);
  app.put("/snacks/:id", { onRequest: [verifyJWT] }, update);
}
