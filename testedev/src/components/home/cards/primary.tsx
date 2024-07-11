import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import theme from '@/theme';
import { Box, Button } from '@mui/material';
import investment from '../../../static/images/Investment-data-bro.png';
import Image from 'next/image';

export default function PrimaryCard() {
  const bg = `linear-gradient(90deg, ${theme.palette.primary.light} 65%, #A0F0CF 100%)`;

  return (
    <Card
      sx={{
        display: 'flex',
        background: bg,
        p: '16px',
        borderRadius: '16px',
        alignItems: 'center',
      }}
    >
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant='h5' fontWeight={700} sx={{ color: '#121212' }}>
          Hello! Welcome to
        </Typography>
        <Typography variant='h5' color='primary' fontWeight={700} mb={2}>
          ConvertaX Invest
        </Typography>
        <Typography variant='subtitle1' fontWeight={500} sx={{ color: '#121212' }}>
          Here you can invest your money with
        </Typography>
        <Typography variant='subtitle1' fontWeight={500} mb={4} sx={{ color: '#121212' }}>
          the best rates in the market.
        </Typography>
        <Button variant='contained' sx={{ color: '#fcfcfc' }}>
          Learn more
        </Button>
      </CardContent>
      <Box
        sx={{ display: { lg: 'flex', md: 'none', sm: 'flex', xs: 'none' } }}
      >
        <Image
          style={{ height: '90%', width: '90%' }}
          src={investment}
          alt="Live from space album cover"
        />
      </Box>
      
    </Card>
  );
}