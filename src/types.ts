export type QueryJob = {
  id: string;
  keyword: string;
  completed_at: string | null;
  created_at: string;
}

export type PositionHit = {
  avg_position: number;
  url: string;
  location_hits_count: number;
}

export type UrlInfo = {
  title: string;
  url: string;
  body: string;
  links: Link[];
}

export type Link = {
  text: string;
  url: string;
}
