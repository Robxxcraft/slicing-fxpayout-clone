export type UserProfile = {
  id: number;
  username: string;
  password?: string;
  role: UserRole;
  profile: string;
}

export type UserRole = "admin" | "user";
