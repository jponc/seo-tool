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
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { QueryJob } from "../../types";

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
  onClick: (queryJobId: string) => void;
};

const QueryJobCards: React.FunctionComponent<QueryJobCardsProps> = ({
  queryJobs,
  onClick,
}) => {
  return (
    <>
      {queryJobs.map((queryJob) => (
        <Grid item xs={4} key={queryJob.id}>
          <Card>
            <CardActionArea onClick={() => onClick(queryJob.id)}>
              <CardContent>
                <CardTitle>
                  <Typography variant="h5" component="div">
                    {queryJob.keyword}
                  </Typography>

                  {queryJob.completed_at ? (
                    <CheckIcon color="success" />
                  ) : (
                    <AutorenewIcon color="warning" />
                  )}
                </CardTitle>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export const DashboardScreen = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { queryJobs, createQueryJob } = useQueryJobs();

  const handleCardOnClick = (queryJobId: string) => {
    console.log(queryJobId);
  };

  const handleQueueOnClick = async () => {
    await createQueryJob(keyword);
    setKeyword("");
  };

  const cards = useMemo(
    () => <QueryJobCards queryJobs={queryJobs} onClick={handleCardOnClick} />,
    [queryJobs]
  );

  return (
    <Layout title="Dashboard">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchRow>
            <SearchField
              variant="standard"
              label="Search keyword"
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
    </Layout>
  );
};
