import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS } from '../../utils/queries';

function AllJobs() {
  const { loading, data } = useQuery(GET_ALL_JOBS);
  const jobsData = data?.getAllJobs || {};

  useEffect(() => {
    if (data?.getAllJobs) {
      console.log(jobsData);
    }
  }, [data, jobsData]);

  return <div>AllJobs</div>;
}

export default AllJobs;
