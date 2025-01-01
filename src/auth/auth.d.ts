import { User } from "src/user/user.schema";

export interface JWTPayload {
  email: string;
  sub: string;
}
