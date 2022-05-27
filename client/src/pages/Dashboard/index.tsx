import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_LOGGED_IN_USER } from '../../utils/queries';

function Dashboard() {
  const { loading, data } = useQuery(QUERY_LOGGED_IN_USER);
  const userData = data?.me || {};
  console.log(userData);

  return <div>Dashboard page</div>;
}

export default Dashboard;
