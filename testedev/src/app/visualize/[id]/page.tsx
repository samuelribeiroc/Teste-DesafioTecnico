'use client'
import * as React from 'react';
import { Grid, Card, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import PageBody from '@/components/templates/layout/pageBody';
import { rows, Data } from '@/components/table';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  params: {id: number};
}

export default function Visualize({ params }: Props) {
  const [invest, setInvest] = React.useState<null | Data>(null);

  const [current, setCurrent] = React.useState<null | number | undefined>(null);
  const [oneYear, setOneYear] = React.useState<null | number[]>(null);
  const [twoYears, setTwoYears] = React.useState<null | number[]>(null);
  const [fiveYears, setFiveYears] = React.useState<null | number[]>(null);
  const [tenYears, setTenYears] = React.useState<null | number[]>(null);

  React.useEffect(() => {
    if (params) {
      setInvest(rows[params.id - 1]);
    };

    const monthsDiff = Math.floor(dayjs().diff(dayjs(invest?.date), 'month', true));

    if (monthsDiff > 0) {
      setCurrent(parseFloat(((invest ? invest.value : 0) * Math.pow((1 + 0.52), monthsDiff)).toFixed(2)));
    } else {
      setCurrent(invest?.value);
    }

    console.log(current)
  }, [params, invest, current])

  const options = {
    chart: {
      height: 350,
      toolbar: {
        show: false
      }
    },
    colors: ['#13DA87'],
    dataLabels: {
      enabled: false
    }
  };

  const series = [{
    name: 'Investment progression',
    data: [31, 40, 28, 51, 42, 109, 100]
  }]

  return (
    <PageBody>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={4}>
          <Box>
              <Card>
                <Typography>
                  Initial investiment:
                </Typography>
                <Typography color='primary'>
                  R$ {invest?.value}
                </Typography>
              </Card>
              <Card>
                <Typography>
                  Current amount:
                </Typography>
                <Typography color='primary'>
                  R$ {current}
                </Typography>
              </Card>
          </Box>
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
    </PageBody>
  );
}
