import React, { createContext, useState, useEffect, useContext } from "react";
import { getQueryJobs, createQueryJob as apiCreateQueryJob } from "../api/api";
import { QueryJob } from "../types";
import { useAuth } from "./AuthContext";

type QueryJobsContextType = {
  queryJobs: QueryJob[];
  createQueryJob: (keyword: string) => Promise<void>;
};

export const QueryJobsContext = createContext<QueryJobsContextType | undefined>(
  undefined
);

export const QueryJobsProvider: React.FunctionComponent = ({ children }) => {
  const [queryJobs, setQueryJobs] = useState<QueryJob[]>([]);
  const { accessToken } = useAuth();

  // Pull latest query jobs on mount
  useEffect(() => {
    if (!accessToken) {
      setQueryJobs([]);
      return;
    }

    (async() => {
      setQueryJobs(await getQueryJobs(accessToken));
    })()
  }, [accessToken]);


  const createQueryJob = async (keyword: string) => {
    if (!accessToken) {
      return;
    }

    await apiCreateQueryJob(accessToken, keyword);
    setQueryJobs(await getQueryJobs(accessToken));
  };

  const contextValue = {
    queryJobs,
    createQueryJob,
  };

  return (
    <QueryJobsContext.Provider value={contextValue}>
      {children}
    </QueryJobsContext.Provider>
  );
};

export const useQueryJobs = () => {
  const context = useContext(QueryJobsContext);
  if (context === undefined) {
    throw new Error("useQueryJobs must be used within a QueryJobsProvider");
  }

  return context;
};
