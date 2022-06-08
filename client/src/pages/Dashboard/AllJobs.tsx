import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Box, Container } from '@mui/material';
import { GET_ALL_JOBS } from '../../utils/queries';
import { Job } from '../../components';

type JobType = {
  company: string;
  location: string;
  position: string;
  status: string;
  type: string;
  _id: string;
};

function AllJobs() {
  const { loading, data } = useQuery(GET_ALL_JOBS);
  const jobsData = data?.getAllJobs || {};

  useEffect(() => {
    if (data?.getAllJobs) {
      console.log(jobsData);
    }
  }, [data, jobsData]);

  return (
    <Box bgcolor="secondary.main">
      <Container maxWidth={false} sx={{ minHeight: 'calc(100vh - 80px)', paddingTop: '3rem' }}>
        {data && (
          <Grid container spacing={2} paddingX={2} display="flex" justifyContent="center">
            {jobsData.map((job: JobType) => {
              return (
                <Grid item key={job._id} xs={12} sm={10} md={6} lg={5} xl={4}>
                  <Job {...job}></Job>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default AllJobs;
