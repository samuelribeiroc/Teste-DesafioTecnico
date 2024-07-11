import * as React from 'react';
import { Box, Container, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { usePathname, useRouter } from 'next/navigation';

interface PageBodyProps {
  children: JSX.Element | React.ReactNode;
}

export default function PageBody({ children }: PageBodyProps) {
  const path = usePathname();
  const back = useRouter().back;

  return (
    <Container
      maxWidth={false}
      sx={{
        p: {
          md: '2dvh 8dvw 2dvh 5dvw',
          xs: '2dvh 5dvw'
        },
        width: { md: '90dvw', xs: '100%' },
        maxWidth: '1600px',
        display: 'flex',
        justifyContent: 'start',
        flexDirection: { md: 'row', xs: 'column' }
      }}
    >
      <Box
        sx={{
          width: { md: '3dvw', xs: '100%' },
          height: { md: '100%', xs: '40px' },
          minWidth: '60px',
          minHeight: '40px',
          mb: '2dvh',
          display: path === '/' ? 'none' : 'flex' ,
          justifyContent: { md: 'center', xs: 'start' }
        }}
      >
        <IconButton
          color='primary'
          aria-label='back button'
          onClick={back}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
      </Box>
      {children}
    </Container>
  )
}