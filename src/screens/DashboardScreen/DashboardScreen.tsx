import { MouseEvent, useMemo, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useQueryJobs } from "../../contexts/QueryJobsContext";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import CardActionArea from "@mui/material/CardActionArea";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { QueryJob } from "../../types";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";

const CardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
`;

const IconChip = styled(Chip)`
  margin-right: 10px;
`;

const SearchField = styled(TextField)`
  margin-right: 10px;
`;

type QueryJobCardsProps = {
  queryJobs: QueryJob[];
  onClick: (queryJobId: string, isCompleted: boolean) => void;
  onDelete: (queryJobId: string) => void;
};

const QueryJobCards: React.FunctionComponent<QueryJobCardsProps> = ({
  queryJobs,
  onClick,
  onDelete,
}) => {
  const currentTime = new Date();

  return (
    <>
      {queryJobs.map((queryJob) => {
        let icon: JSX.Element;
        const next30Minutes = new Date(queryJob.created_at);
        next30Minutes.setMinutes(next30Minutes.getMinutes() + 30);

        if (queryJob.completed_at) {
          icon = (
            <IconChip label="Completed" color="success" variant="filled" />
          );
        } else if (currentTime >= next30Minutes) {
          icon = <IconChip label="Error" color="error" variant="filled" />;
        } else {
          icon = (
            <IconChip label="Processing" color="warning" variant="filled" />
          );
        }

        const handleDeleteOnClick = (e: any) => {
          e.stopPropagation();

          onDelete(queryJob.id);
        };

        return (
          <Grid item xs={4} key={queryJob.id}>
            <Card>
              <CardActionArea
                onClick={() => onClick(queryJob.id, !!queryJob.completed_at)}
              >
                <CardContent>
                  <CardTitle>
                    <Typography variant="h5" component="div">
                      {queryJob.keyword}
                    </Typography>

                    <Icons>
                      {icon}
                      <DeleteIcon onClick={handleDeleteOnClick} />
                    </Icons>
                  </CardTitle>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export const DashboardScreen = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { queryJobs, createQueryJob, deleteQueryJob } = useQueryJobs();
  const navigate = useNavigate();

  const isQueryJobsLoaded = queryJobs.length > 0;

  const handleQueueOnClick = async () => {
    await createQueryJob(keyword);
    setKeyword("");
  };

  const cards = useMemo(() => {
    const handleCardOnClick = (queryJobId: string, isCompleted: boolean) => {
      if (isCompleted) {
        navigate(`/query-jobs/${queryJobId}`);
      }
    };

    const handleOnDelete = (queryJobId: string) => {
      deleteQueryJob(queryJobId);
    };

    return <QueryJobCards queryJobs={queryJobs} onClick={handleCardOnClick} onDelete={handleOnDelete} />;
  }, [navigate, queryJobs, deleteQueryJob]);

  return (
    <Layout title="Dashboard">
      {isQueryJobsLoaded ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SearchRow>
              <SearchField
                variant="standard"
                label="Queue keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => handleQueueOnClick()}
              >
                Queue
              </Button>
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
