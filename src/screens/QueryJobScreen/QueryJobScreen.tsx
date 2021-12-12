import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { useQueryJob } from "../../contexts/QueryJobContext";

export const QueryJobScreen = () => {
  const { id } = useParams();
  const { queryJob, positionHits, loadQueryJob, setUrl } = useQueryJob();

  useEffect(() => {
    if (!id) {
      return;
    }

    loadQueryJob(id);
  }, [id, loadQueryJob]);

  const handlePositionHitOnClick = (url: string) => {
    setUrl(url);
  }

  return (
    <Layout title={queryJob ? queryJob.keyword : "Loading..."}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Hits</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positionHits.map((positionHit) => (
              <TableRow
                key={positionHit.url}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handlePositionHitOnClick(positionHit.url)}
              >
                <TableCell component="th" scope="row">
                  {positionHit.avg_position}
                </TableCell>
                <TableCell>{positionHit.url}</TableCell>
                <TableCell>{positionHit.location_hits_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};
