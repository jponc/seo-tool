import React, { createContext, useState, useEffect, useContext } from "react";
import * as api from "../api/api";
import { QueryJob, PositionHit, UrlInfo } from "../types";
import { useAuth } from "./AuthContext";

type QueryJobContextType = {
  queryJob: QueryJob | undefined;
  positionHits: PositionHit[];
  loadQueryJob: (queryJobId: string) => void;
  urlInfo: UrlInfo | undefined
  setUrl: (url: string | undefined) => void;
};

export const QueryJobContext = createContext<QueryJobContextType | undefined>(
  undefined
);

export const QueryJobProvider: React.FunctionComponent = ({ children }) => {
  const [queryJobId, setQueryJobId] = useState<string | undefined>(undefined);
  const [queryJob, setQueryJob] = useState<QueryJob | undefined>(undefined);
  const [positionHits, setPositionHits] = useState<PositionHit[]>([]);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [urlInfo, setUrlInfo] = useState<UrlInfo | undefined>(undefined);

  const { accessToken } = useAuth();

  // Fetch QueryJob when queryJobId changes
  useEffect(() => {
    if (!accessToken || queryJobId === undefined) {
      return;
    }

    (async () => {
      setQueryJob(await api.getQueryJob(accessToken, queryJobId));
    })();
  }, [accessToken, queryJobId]);

  // Fetch PositionHits when queryJobId changes
  useEffect(() => {
    if (!accessToken || queryJobId === undefined) {
      return;
    }

    (async () => {
      setPositionHits(await api.getPositionHits(accessToken, queryJobId));
    })();
  }, [accessToken, queryJobId]);

  // Set/unset UrlInfo when queryJobId and url changes
  useEffect(() => {
    if (!accessToken || queryJobId === undefined) {
      return;
    }

    if (url === undefined) {
      setUrlInfo(undefined);
      return;
    }

    (async () => {
      setUrlInfo(await api.getUrlInfo(accessToken, queryJobId, url));
    })();
  }, [accessToken, queryJobId, url]);

  const loadQueryJob = (queryJobId: string) => {
    setQueryJobId(queryJobId);
  };

  const contextValue = {
    queryJob,
    positionHits,
    loadQueryJob,
    urlInfo,
    setUrl,
  };

  return (
    <QueryJobContext.Provider value={contextValue}>
      {children}
    </QueryJobContext.Provider>
  );
};

export const useQueryJob = () => {
  const context = useContext(QueryJobContext);
  if (context === undefined) {
    throw new Error("useQueryJob must be used within a QueryJobProvider");
  }

  return context;
};
