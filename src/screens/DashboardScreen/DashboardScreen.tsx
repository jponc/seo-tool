import { useMemo } from "react";
import { Layout } from "../../components/Layout/Layout";
import Grid from "@mui/material/Grid";
import { useQueryJobs } from "../../contexts/QueryJobsContext";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { QueryJobCards } from "../../components/QueryJobCards/QueryJobCards";
import { KeywordQueue } from "../../components/KeywordQueue/KeywordQueue";

const SearchRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
`;

export const DashboardScreen = () => {
  const { queryJobs, createQueryJob, deleteQueryJob } = useQueryJobs();
  const navigate = useNavigate();
  const isQueryJobsLoaded = queryJobs.length > 0;

  const handleOnQueueClick = (keyword: string) => {
    createQueryJob(keyword);
  };

  const cards = useMemo(() => {
    const handleCardOnClick = (queryJobId: string) => {
      const queryJob = queryJobs.find(qj => qj.id === queryJobId)

      const isCompleted = queryJob && queryJob.completed_at !== null

      if (isCompleted) {
        navigate(`/query-jobs/${queryJobId}`);
      }
    };

    const handleOnDelete = (queryJobId: string) => {
      deleteQueryJob(queryJobId);
    };

    return (
      <QueryJobCards
        queryJobs={queryJobs}
        onClick={handleCardOnClick}
        onDelete={handleOnDelete}
      />
    );
  }, [navigate, queryJobs, deleteQueryJob]);

  return (
    <Layout title="Dashboard">
      {isQueryJobsLoaded ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SearchRow>
              <KeywordQueue onQueueClick={handleOnQueueClick} />
            </SearchRow>
          </Grid>
          {cards}
        </Grid>
      ) : (
        <Typography variant="h6" gutterBottom component="div">
          Initializing...
        </Typography>
      )}
    </Layout>
  );
};
