import * as React from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import { Card, CircularProgress, Tab, Tabs } from '@mui/material';
import Chart from "react-apexcharts";
import dayjs from 'dayjs';
import { Data } from '../../home/table';

interface Props {
  invest: Data | null;
  current: number;
};

export default function CardGraph({ invest, current }: Props) {
  const [tab, setTab] = React.useState<string>('0');

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
    name: 'Investment',
    data: [{
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }, {
        y: 0,
        x: dayjs().format('DD/MM/YYYY')
      }
    ]
  }]);

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
    },
    tooltip: {
      theme: 'dark', // 'light' or 'dark'
      style: {
        fontSize: '14px',
        color: '#121212'
      }
    }
  };

  React.useEffect(() => {
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
  }, [current, invest]);

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
  }, [tenYears]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  };

  return (
    <Card
      sx={{
        p: '16px',
        borderRadius: '16px',
        overflowX: 'scroll',
        display: 'flex'
      }}
    >
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
              options={options}
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
              options={options}
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
              options={options}
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
              options={options}
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
              options={options}
              series={seriesTenYears}
              type="area"
              width="500"
            />
          }
        </TabPanel>
      </TabContext>
    </Card>
  )
};