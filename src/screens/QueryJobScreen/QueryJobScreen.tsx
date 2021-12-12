import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Drawer,
  Typography,
  Link,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { useQueryJob } from "../../contexts/QueryJobContext";
import styled from "styled-components";

const DrawerContent = styled.div`
  width: 500px;
  padding: 80px 20px;
`;

const BodyContainer = styled.div`
  max-height: 300px;
  margin-bottom: 10px;
  overflow: scroll;
`;

const LinksContainer = styled.div`
  max-height: 300px;
  overflow: scroll;
`;

export const QueryJobScreen = () => {
  const [isUrlDrawerOpen, setIsUrlDrawerOpen] = useState<boolean>(false);

  const { id } = useParams();
  const {
    queryJob,
    positionHits,
    loadQueryJob,
    setUrl,
    urlInfo,
  } = useQueryJob();

  useEffect(() => {
    if (!id) {
      return;
    }

    loadQueryJob(id);
  }, [id, loadQueryJob]);

  const handlePositionHitOnClick = (url: string) => {
    setUrl(url);
    setIsUrlDrawerOpen(true);
  };

  const handleDrawerOnClose = () => {
    setIsUrlDrawerOpen(false);
    setUrl(undefined);
  };

  return (
    <>
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
      <Drawer
        anchor="right"
        open={isUrlDrawerOpen}
        onClose={handleDrawerOnClose}
      >
        <DrawerContent>
          {urlInfo ? (
            <>
              <Typography variant="h6" gutterBottom component="div">
                URL
              </Typography>
              <Link
                href={urlInfo.url}
                color="primary"
                variant="body1"
                target="_blank"
              >
                {urlInfo.url}
              </Link>
              <Typography variant="h6" gutterBottom component="div">
                Title
              </Typography>
              <Typography variant="body1" gutterBottom>
                {urlInfo.title}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Body
              </Typography>
              <BodyContainer>
                <Typography variant="body1" gutterBottom>
                  {urlInfo.body}
                </Typography>
              </BodyContainer>
              <Typography variant="h6" gutterBottom component="div">
                Links
              </Typography>
              <LinksContainer>
                {urlInfo.links.map((link, idx) => (
                  <div>
                    <Link
                      href={link.url}
                      color="primary"
                      variant="body2"
                      target="_blank"
                      key={idx}
                    >
                      {link.text}
                    </Link>
                  </div>
                ))}
              </LinksContainer>
            </>
          ) : (
            <Typography variant="h6" gutterBottom component="div">
              Loading...
            </Typography>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
