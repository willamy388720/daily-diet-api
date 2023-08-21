import { app } from "@/app";
import { register } from "./register";
import { authenticate } from "./authenticate";

export async function userRoutes() {
  app.post("/signup", register);
  app.post("/signin", authenticate);
}
