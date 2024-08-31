"use client";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import styles from "@/styles/modules/auth.module.css";

interface LoadingContextType {
  loading: boolean;
  setLoading: () => void;
  clearLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoadingState] = useState(false);
  const path = usePathname();

  const setLoading = () => {
    setLoadingState(true);
  };

  const clearLoading = () => {
    setLoadingState(false);
  };

  useEffect(() => {
    setLoadingState(false);
  }, [path]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading, clearLoading }}>
      {loading && (
        <div className={styles.container}>
          <div>
            <div className={styles.circle}>
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export { LoadingProvider, useLoading };
