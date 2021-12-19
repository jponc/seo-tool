import { useMemo, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useQueryJobs } from "../../contexts/QueryJobsContext";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CardActionArea from "@mui/material/CardActionArea";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { QueryJob } from "../../types";
import { useNavigate } from "react-router-dom";

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

const SearchField = styled(TextField)`
  margin-right: 10px;
`;

type QueryJobCardsProps = {
  queryJobs: QueryJob[];
  onClick: (queryJobId: string, isCompleted: boolean) => void;
};

const QueryJobCards: React.FunctionComponent<QueryJobCardsProps> = ({
  queryJobs,
  onClick,
}) => {
  const currentTime = new Date();

  return (
    <>
      {queryJobs.map((queryJob) => {
        let icon: JSX.Element;
        const next30Minutes = new Date(queryJob.created_at);
        next30Minutes.setMinutes(next30Minutes.getMinutes() + 30);

        if (queryJob.completed_at) {
          icon = <CheckIcon color="success" />;
        } else if (currentTime >= next30Minutes) {
          icon = <CloseIcon color="error" />;
        } else {
          icon = <AutorenewIcon color="warning" />;
        }

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

                    {icon}
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
  const { queryJobs, createQueryJob } = useQueryJobs();
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

    return <QueryJobCards queryJobs={queryJobs} onClick={handleCardOnClick} />;
  }, [navigate, queryJobs]);

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
