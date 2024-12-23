import { User } from "src/user/user.schema";

export interface JWTPayload {
  email: string;
  sub: string;
}

export interface AuthResponse {
  email: string;
  name: string;
  location: User["location"];
  accessToken: string;
}
