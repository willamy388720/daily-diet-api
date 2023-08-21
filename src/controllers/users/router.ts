import { app } from "@/app";
import { register } from "./register";

export async function userRoutes() {
  app.post("/signup", register);
}
