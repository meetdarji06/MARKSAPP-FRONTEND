import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); 
  return (
    <UserContext.Provider value={{ admin, setAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
