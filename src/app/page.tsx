'use client'
import * as React from 'react';
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Grid, Card, Box } from "@mui/material";
import PrimaryCard from '@/components/home/cards/primary';
import InvestmentsTable from '@/components/home/table';
import PageBody from '@/components/templates/layout/pageBody';
import SecondaryCard from '@/components/home/cards/secondary';

export default function Home() {
  return (
    <MuiLocalizationProvider dateAdapter={AdapterDateFns}>
      <PageBody>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { md: 'calc(100% - 75px)', xs: '100%' }
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <PrimaryCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <SecondaryCard />
            </Grid>
          </Grid>

          <InvestmentsTable />
        </Box>
      </PageBody>
    </MuiLocalizationProvider>
  );
}
