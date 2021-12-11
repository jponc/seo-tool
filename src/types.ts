export type QueryJob = {
  id: string;
  keyword: string;
  completed_at: string | null;
  zenserp_batch_id: string | null;
  zenserp_batch_processed: boolean;
  created_at: string;
}
