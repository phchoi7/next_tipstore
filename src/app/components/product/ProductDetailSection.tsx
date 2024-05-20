import React from 'react';
import { Typography, Box } from '@mui/material';

const ProductDetailSection = ({ title, content }: any) => (
  <Box
    sx={{
      bgcolor:
        title == '條款及細則'
          ? 'rgba(25,135,84,.06)'
          : title == '使用方法'
          ? 'rgba(255,193,7,.09)'
          : 'rgba(255,112,32,.06)',
      p: 2,
      mb: 2,
      borderRadius: '10px',
    }}
  >
    <Typography variant="h4" sx={{ mb: 1, color: '#333' }}>
      {title}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        whiteSpace: 'pre-wrap',
        color: '#666',
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </Typography>
  </Box>
);

export default ProductDetailSection;
