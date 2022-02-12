import React, { createContext, useState, useEffect, useContext } from "react";
import * as api from "../api/api";
import { QueryJob } from "../types";
import { useAuth } from "./AuthContext";

type QueryJobsContextType = {
  queryJobs: QueryJob[];
  createQueryJob: (keyword: string) => Promise<void>;
  deleteQueryJob: (queryJobId: string) => void;
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
      setQueryJobs(await api.getQueryJobs(accessToken));
    })()
  }, [accessToken]);

  const createQueryJob = async (keyword: string) => {
    if (!accessToken) {
      return;
    }

    const newQueryJobId = await api.createQueryJob(accessToken, keyword);
    const newQueryJob: QueryJob = {
      id: newQueryJobId,
      keyword,
      completed_at: null,
      zenserp_batch_id: null,
      zenserp_batch_processed: false,
      created_at: new Date().toISOString(),
    }

    const newQueryJobs = [newQueryJob, ...queryJobs];
    setQueryJobs(newQueryJobs);
  };

  const deleteQueryJob = async (queryJobId: string) => {
    if (!accessToken) {
      return;
    }

    await api.deleteQueryJob(accessToken, queryJobId)
    const newQueryJobs = queryJobs.filter(qj => qj.id !== queryJobId)
    setQueryJobs(newQueryJobs);
  };

  const contextValue = {
    queryJobs,
    createQueryJob,
    deleteQueryJob,
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
