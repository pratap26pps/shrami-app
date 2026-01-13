import { createContext, useState } from "react";

export const HireContext = createContext();

export const HireProvider = ({ children }) => {
  const [hiredWorkers, setHiredWorkers] = useState([]);

  const hireWorker = (worker) => {
    setHiredWorkers((prev) => [...prev, worker]);
  };

  return (
    <HireContext.Provider value={{ hiredWorkers, hireWorker }}>
      {children}
    </HireContext.Provider>
  );
};
