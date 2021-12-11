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

const CardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DashboardScreen = () => {
  const { queryJobs } = useQueryJobs();

  const handleCardOnClick = (queryJobId: string) => {
    console.log(queryJobId);
  };

  return (
    <Layout title="Dashboard">
      <Grid container spacing={2}>
        {queryJobs.map((queryJob) => (
          <Grid item xs={4}>
            <Card>
              <CardActionArea onClick={() => handleCardOnClick(queryJob.id)}>
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
      </Grid>
    </Layout>
  );
};
