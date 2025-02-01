import { Request } from "express";
import { User } from "src/user/user.schema";

export type RequestExtented = Request & {
  user: User;
};
