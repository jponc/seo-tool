import React from "react";
import { QueryJob } from "../../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { Chip } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const CardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
`;

const IconChip = styled(Chip)`
  margin-right: 10px;
`;

type QueryJobCardsProps = {
  queryJobs: QueryJob[];
  onClick: (queryJobId: string, isCompleted: boolean) => void;
  onDelete: (queryJobId: string) => void;
};

export const QueryJobCards: React.FunctionComponent<QueryJobCardsProps> = ({
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
