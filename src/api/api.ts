import { QueryJob, PositionHit, UrlInfo } from "../types";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getQueryJobs = async (token: string): Promise<QueryJob[]> => {
  const res = await fetch(`${baseUrl}/query-jobs`, {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    method: "GET"
  });

  const jsonData: QueryJob[] = await res.json();

  if (!res.ok) {
    throw new Error(`failed to fetch query jobs`);
  }


  return jsonData;
}

export const getQueryJob = async (token: string, id: string): Promise<QueryJob> => {
  const res = await fetch(`${baseUrl}/query-jobs/${id}`, {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    method: "GET"
  });

  const jsonData: QueryJob = await res.json();

  if (!res.ok) {
    throw new Error(`failed to fetch query job: ${id}`);
  }


  return jsonData;
}

export const deleteQueryJob = async (token: string, id: string): Promise<void> => {
  const res = await fetch(`${baseUrl}/query-jobs/${id}`, {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error(`failed to delete query job: ${id}`);
  }

  return;
}

export const getPositionHits = async (token: string, id: string): Promise<PositionHit[]> => {
  const res = await fetch(`${baseUrl}/query-jobs/${id}/position-hits`, {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    method: "GET"
  });

  const jsonData: PositionHit[] = await res.json();

  if (!res.ok) {
    throw new Error(`failed to fetch query job position hits: ${id}`);
  }


  return jsonData;
}

export const getUrlInfo = async (token: string, id: string, url: string): Promise<UrlInfo> => {
  const res = await fetch(`${baseUrl}/query-jobs/${id}/url-info?url=${url}`, {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    method: "GET"
  });

  const jsonData: UrlInfo = await res.json();

  if (!res.ok) {
    throw new Error(`failed to fetch query job position hits: ${id}`);
  }


  return jsonData;
}

export const createQueryJob = async (token: string, keyword: string): Promise<string> => {
  const res = await fetch(`${baseUrl}/query-jobs`, {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({
      keyword,
    }),
  });

  const jsonData: string = await res.json();

  if (!res.ok) {
    throw new Error(`failed to create query job`);
  }


  return jsonData;
}
