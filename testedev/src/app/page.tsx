'use client'
import * as React from 'react';
import { Container, Grid, Card } from "@mui/material";
import PrimarySearchAppBar from "@/components/templates/menu";
import PrimaryCard from '@/components/cards/home/primary';
import InvestmentsTable from '@/components/table';

export default function Home() {
  return (
    <Container sx={{ p: '0 !important', minHeight:'100vh' }} maxWidth={false}>
      <PrimarySearchAppBar />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <PrimaryCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>aaaa</Card>
        </Grid>
      </Grid>

      <InvestmentsTable />
    </Container>
  );
}
