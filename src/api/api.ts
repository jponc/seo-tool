import { QueryJob } from "../types";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
  console.log(baseUrl);

export const getQueryJobs = async (token: string): Promise<QueryJob[]> => {
  const res = await fetch(`${baseUrl}/GetQueryJobs`, {
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


