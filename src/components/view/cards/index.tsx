import { Card, Typography } from '@mui/material';
import * as React from 'react';

interface Props {
  order: number;
  value: number;
};

export default function CardInfo({ order, value }: Props) {
  return (
    <Card
      sx={{
        p: '16px',
        borderRadius: '16px',
        mb: '16px'
      }}
    >
      <Typography>
        { order === 1 && 'Initial investiment:' }
        { order === 2 && 'Current amount:' }
      </Typography>
      <Typography color='primary'>
        R$ {value.toFixed(2)}
      </Typography>
    </Card>
  )
};