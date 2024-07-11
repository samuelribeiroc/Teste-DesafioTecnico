'use client'
import * as React from 'react';
import { Grid, Card, Typography, Box, Tabs, Tab, CircularProgress, Button } from "@mui/material";
import Chart from "react-apexcharts";
import PageBody from '@/components/templates/layout/pageBody';
import { Data, rowView } from '@/components/table';
import dayjs from 'dayjs';
import { TabContext, TabPanel } from '@mui/lab';

interface Props {
  params: {id: number};
}

export default function Visualize({ params }: Props) {
  const [invest, setInvest] = React.useState<null | Data>(null);

  const [tab, setTab] = React.useState<string>('0');

  const [current, setCurrent] = React.useState<number>(0);
  const [oneYear, setOneYear] = React.useState<number>(0);
  const [twoYears, setTwoYears] = React.useState<number>(0);
  const [fiveYears, setFiveYears] = React.useState<number>(0);
  const [tenYears, setTenYears] = React.useState<number>(0);

  const [seriesCurrent, setSeriesCurrent] = React.useState<ApexAxisChartSeries>([{
    name: 'Investment progression',
    data: [{
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }, {
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }
    ]
  }]);

  const [seriesOneYear, setSeriesOneYear] = React.useState<ApexAxisChartSeries>([{
    name: 'Investment progression',
    data: [{
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }, {
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }
    ]
  }]);

  const [seriesTwoYears, setSeriesTwoYears] = React.useState<ApexAxisChartSeries>([{
    name: 'Investment progression',
    data: [{
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }, {
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }
    ]
  }]);

  const [seriesFiveYears, setSeriesFiveYears] = React.useState<ApexAxisChartSeries>([{
    name: 'Investment progression',
    data: [{
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }, {
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }
    ]
  }]);

  const [seriesTenYears, setSeriesTenYears] = React.useState<ApexAxisChartSeries>([{
    name: 'Investment progression',
    data: [{
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }, {
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }
    ]
  }]);

  function getCookie(name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  React.useEffect(() => {
    if (params) {
      setInvest(rowView);
    };

    const monthsDiff = Math.floor(dayjs().diff(dayjs(invest?.date, 'DD/MM/YYYY'), 'month', true));

    if (monthsDiff > 0) {
      setCurrent(parseFloat(((invest ? invest.value : 0) * Math.pow((1 + 0.0052), monthsDiff)).toFixed(2)));
    } else {
      setCurrent((invest ? invest.value : 0));
    };

    setSeriesCurrent([{
      name: seriesCurrent[0].name,
      data: [
        { x: invest?.date, y: (invest ? invest.value : 0) },
        { x: dayjs().format('DD/MM/YYYY'), y: current }
      ]
    }]);

    //1 year progression
    setOneYear(parseFloat((current * Math.pow((1 + 0.0052), 12)).toFixed(2)));

    //2 years progression
    setTwoYears(parseFloat((current * Math.pow((1 + 0.0052), 24)).toFixed(2)));

    //5 years progression
    setFiveYears(parseFloat((current * Math.pow((1 + 0.0052), 60)).toFixed(2)));

    //10 years progression
    setTenYears(parseFloat((current * Math.pow((1 + 0.0052), 120)).toFixed(2)));

    //If we reload the page
    var lastSeen = getCookie("lastSeen");
    if (typeof lastSeen === 'undefined' || lastSeen === null) {
      lastSeen = '';
    }
    const decodedString = lastSeen ? decodeURIComponent(lastSeen) : '';

    const lastSeenObj = JSON.parse(decodedString);
    const lastSeenSet: Data = lastSeenObj;
    console.log(lastSeenSet)

    setInvest(lastSeenSet);
  }, [current, invest, params])

  React.useEffect(() => {
    setSeriesOneYear([{
      name: seriesCurrent[0].name,
      data: [
        { x: dayjs().format('DD/MM/YYYY'), y: current },
        { x: dayjs().add(1, 'year').format('DD/MM/YYYY'), y: oneYear }
      ]
    }]);

    setSeriesTwoYears([{
      name: seriesCurrent[0].name,
      data: [
        { x: dayjs().format('DD/MM/YYYY'), y: current },
        { x: dayjs().add(2, 'year').format('DD/MM/YYYY'), y: twoYears }
      ]
    }]);

    setSeriesFiveYears([{
      name: seriesCurrent[0].name,
      data: [
        { x: dayjs().format('DD/MM/YYYY'), y: current },
        { x: dayjs().add(5, 'year').format('DD/MM/YYYY'), y: fiveYears }
      ]
    }]);

    setSeriesTenYears([{
      name: seriesCurrent[0].name,
      data: [
        { x: dayjs().format('DD/MM/YYYY'), y: current },
        { x: dayjs().add(10, 'year').format('DD/MM/YYYY'), y: tenYears }
      ]
    }]);
  }, [tenYears])

  const optionsCurrent = {
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  };

  return (
    <PageBody>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={4}>
            <Box>
              <Card sx={{
                p: '16px',
                borderRadius: '16px',
                mb: '16px'
              }}>
                <Typography onClick={() => console.log(oneYear)}>
                  Initial investiment:
                </Typography>
                <Typography color='primary'>
                  R$ {invest?.value.toFixed(2)}
                </Typography>
              </Card>

              <Card sx={{
                p: '16px',
                borderRadius: '16px'
              }}>
                <Typography>
                  Current amount:
                </Typography>
                <Typography color='primary'>
                  R$ {current.toFixed(2)}
                </Typography>
              </Card>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Card sx={{
              p: '16px',
              borderRadius: '16px',
              overflowX: 'scroll',
              display: 'flex'
            }}>
              <TabContext value={tab}>
                <Tabs
                  orientation='vertical'
                  value={tab}
                  onChange={handleChange}
                  sx={{ borderRight: 1, borderColor: 'primary', minWidth: '161px' }}
                >
                  <Tab label='Current progression' value='0' />
                  <Tab label='Progression in 1 year' value='1' />
                  <Tab label='Progression in 2 years' value='2' />
                  <Tab label='Progression in 5 years' value='3' />
                  <Tab label='Progression in 10 years' value='4' />
                </Tabs>

                <TabPanel value='0'>
                  {current === 0 &&
                    <CircularProgress />
                  }
                  {current !== 0 &&
                    <Chart
                      options={optionsCurrent}
                      series={seriesCurrent}
                      type="area"
                      width="500"
                    />
                  }
                </TabPanel>

                <TabPanel value='1'>
                  {oneYear === 0 &&
                    <CircularProgress />
                  }
                  {oneYear !== 0 &&
                    <Chart
                      options={optionsCurrent}
                      series={seriesOneYear}
                      type="area"
                      width="500"
                    />
                  }
                </TabPanel>

                <TabPanel value='2'>
                  {twoYears === 0 &&
                    <CircularProgress />
                  }
                  {twoYears !== 0 &&
                    <Chart
                      options={optionsCurrent}
                      series={seriesTwoYears}
                      type="area"
                      width="500"
                    />
                  }
                </TabPanel>

                <TabPanel value='3'>
                  {fiveYears === 0 &&
                    <CircularProgress />
                  }
                  {fiveYears !== 0 &&
                    <Chart
                      options={optionsCurrent}
                      series={seriesFiveYears}
                      type="area"
                      width="500"
                    />
                  }
                </TabPanel>

                <TabPanel value='4'>
                  {tenYears === 0 &&
                    <CircularProgress />
                  }
                  {tenYears !== 0 &&
                    <Chart
                      options={optionsCurrent}
                      series={seriesTenYears}
                      type="area"
                      width="500"
                    />
                  }
                </TabPanel>
              </TabContext>
            </Card>
          </Grid>
        </Grid>

        <Card
          sx={{
            width: '100%',
            mt: '16px',
            borderRadius: '16px',
            p: '16px'
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant='h6'>
              Historico
            </Typography>

            <Button variant='contained'>
              Realizar retirada
            </Button>
          </Box>
        </Card>
      </Box>
    </PageBody>
  );
}
