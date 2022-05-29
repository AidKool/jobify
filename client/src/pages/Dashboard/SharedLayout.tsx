import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function SharedLayout() {
  return (
    <nav>
      <Link to="all-jobs">all jobs</Link>
      <Link to="add-jobs">add jobs</Link>
      <Outlet />
    </nav>
  );
}

export default SharedLayout;
