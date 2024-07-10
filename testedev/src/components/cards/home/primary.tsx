import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import theme from '@/theme';
import { Button } from '@mui/material';

export default function PrimaryCard() {
  const bg = theme.palette.primary.light;

  return (
    <Card sx={{ display: 'flex', bgcolor: bg, p: '16px', borderRadius: '16px' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant='h5' fontWeight={700} sx={{ color: '#121212' }}>
          Hello! Welcome to
        </Typography>
        <Typography variant='h5' color='primary' fontWeight={700} mb={2}>
          ConvertaX Invest
        </Typography>
        <Typography variant='subtitle1' mb={4} sx={{ color: '#121212' }}>
          Here you can invest your money with the best rates in the market.
        </Typography>
        <Button variant='contained' sx={{ color: '#fcfcfc' }}>
          Learn more
        </Button>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}