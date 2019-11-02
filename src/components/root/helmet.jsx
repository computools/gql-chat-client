import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetWrapper = () => {
  return (
    <Helmet>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
    </Helmet>
  );
};

export default HelmetWrapper;
