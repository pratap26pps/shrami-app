import { createContext, useState } from "react";

export const HireContext = createContext();

export const HireProvider = ({ children }) => {
  const [hiredWorkers, setHiredWorkers] = useState([]);

  const hireWorker = (worker) => {
    setHiredWorkers((prev) => [...prev, worker]);
  };

  const addWorkers = (workers) => {
    if (!Array.isArray(workers) || workers.length === 0) return;
    setHiredWorkers((prev) => [...prev, ...workers]);
  };

  const clearCart = () => {
    setHiredWorkers([]);
  };

  const removeWorkerAt = (index) => {
    setHiredWorkers((prev) => prev.filter((_, i) => i !== index));
  };

  const removeWorker = (worker) => {
    const id = worker?._id ?? worker?.id;
    if (id == null) return;
    setHiredWorkers((prev) => prev.filter((w) => (w?._id ?? w?.id) !== id));
  };

  const isWorkerHired = (worker) => {
    const id = worker?._id ?? worker?.id;
    if (id == null) return false;
    return hiredWorkers.some((w) => (w?._id ?? w?.id) == id);
  };

  return (
    <HireContext.Provider value={{ hiredWorkers, hireWorker, addWorkers, clearCart, removeWorkerAt, removeWorker, isWorkerHired }}>
      {children}
    </HireContext.Provider>
  );
};
