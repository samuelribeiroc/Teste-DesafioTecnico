import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import theme from '@/theme';
import { Button } from '@mui/material';
import Image from 'next/image';
import criptomoedas from '../../../static/images/criptomoedas.png'

export default function SecondaryCard() {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        p: '16px',
        borderRadius: '16px',
        position: 'relative',
        height: '100%'
      }}
    >
      <Image
        fill
        src={criptomoedas}
        alt='Criptomoedas'
        style={{ objectFit: "cover"}}
      />
      <CardContent sx={{ flex: '1 0 auto', zIndex: 2 }}>
        <Typography variant='h6' fontWeight={700}>
          Discover how to make your
        </Typography>
        <Typography variant='h6' fontWeight={700}>
          money grow much more with
        </Typography>
        <Typography variant='h6' fontWeight={700} mb={2}>
          ConvertaX Invest
        </Typography>
        
        <Button variant='outlined' sx={{ color: '#fcfcfc' }}>
          Learn more
        </Button>
      </CardContent>
    </Card>
  );
}