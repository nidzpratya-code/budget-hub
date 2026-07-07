export type UserRole = "admin" | "province" | "manager" | "region";

export type AppUser = {
  username: string;
  password: string;
  name: string;
  role: UserRole;
  province: string;
  region: string;
  active: boolean | string;
  lineTo?: string;
};