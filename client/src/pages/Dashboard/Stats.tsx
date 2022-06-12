import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { StatusCard } from '../../components';
import { useQuery } from '@apollo/client';
import { SHOW_STATS } from '../../utils/queries';

function Stats() {
  const { loading, data } = useQuery(SHOW_STATS);
  const stats = data?.showStats || [
    { _id: 'pending', count: 0 },
    { _id: 'interview', count: 0 },
    { _id: 'complete', count: 0 },
  ];
  console.log(stats);

  type StatusType = {
    _id: string;
    count: number;
  };

  return (
    <Box bgcolor="secondary.main">
      <Container maxWidth={false} sx={{ minHeight: 'calc(100vh - 80px)', paddingTop: '3rem' }}>
        <Grid container spacing={2} paddingX={2} display="flex" alignItems="center" justifyContent="center">
          {stats.map((status: StatusType) => {
            const { _id, count } = status;
            return (
              <Grid item key={_id} xs={12} sm={6} lg={4} xl={4}>
                <StatusCard _id={_id} count={count} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default Stats;
