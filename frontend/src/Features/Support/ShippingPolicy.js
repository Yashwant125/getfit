import React from 'react';
import { Typography, Box } from '@mui/material';

const ShippingPolicy = () => (
  <Box p={3}>
    <Typography variant="h5" gutterBottom>
      Shipping Policy
    </Typography>
    <Typography component="p" sx={{ mb: 2 }}>
      As GetFit is a digital service, there are no physical products to ship. All features and services are delivered digitally through our platform.
    </Typography>
    <Typography component="p" sx={{ mb: 2 }}>
      For any queries:
    </Typography>
    <Typography component="p" sx={{ mb: 2 }}>
      📧 Email: yashwantk784@gmail.com
    </Typography>
    <Typography component="p">
      📞 Phone: +91 83282 99547
    </Typography>
  </Box>
);

export default ShippingPolicy;
