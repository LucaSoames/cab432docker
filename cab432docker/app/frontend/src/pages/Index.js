import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import VisitCounter from '../components/visitcounter.jsx';
import StockChart from '../components/stockchart.jsx';

const meta = {
  title: '',
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function Index(data) {
  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      <VisitCounter />
      <StockChart />
    </React.Fragment>
  );
}

