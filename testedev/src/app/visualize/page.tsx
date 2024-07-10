'use client'
import * as React from 'react';
import { Container, Grid, Card, Typography } from "@mui/material";
import PrimarySearchAppBar from "@/components/templates/menu";
import Chart from "react-apexcharts";

export default function Home() {
  const options = {
    chart: {
      height: 350
    },
    colors: ['#13DA87'],
    dataLabels: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  };

  const series = [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }]

  return (
    <Container sx={{ p: '0 !important', minHeight:'100vh' }} maxWidth={false}>
      <PrimarySearchAppBar />

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={4}>
          <Grid container direction="column" spacing={2}>
            <Grid xs={12} md={12}>
              <Card>
                <Typography>
                  Initial investiment:
                </Typography>
                <Typography color='primary'>
                  R$ 4500,00
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <Typography>
                  Current amount:
                </Typography>
                <Typography color='primary'>
                  R$ 4500,00
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        
        
        <Grid item xs={12} md={8}>
          <Card>
            <Chart
              options={options}
              series={series}
              type="area"
              width="500"
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
