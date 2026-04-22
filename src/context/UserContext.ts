import React from "react";
import type { UserProfile } from "@/types/user.type";

type UserContextType = [
  UserProfile | null, 
  React.Dispatch<React.SetStateAction<UserProfile | null>>
];

const UserContext = React.createContext<UserContextType>([null, () => {}]);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;
