'use client'
import * as React from 'react';
import { Grid, Card, Typography, Box, Button } from "@mui/material";
import PageBody from '@/components/templates/layout/pageBody';
import { Data, rowView } from '@/components/home/table';
import dayjs from 'dayjs';
import CardInfo from '@/components/view/cards';
import CardGraph from '@/components/view/graph';
import History from '@/components/view/history';

interface Props {
  params: {id: number};
}

export default function Visualize({ params }: Props) {
  const [invest, setInvest] = React.useState<null | Data>(null);
  const [current, setCurrent] = React.useState<number>(0);

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

    //If we reload the page
    var lastSeen = getCookie("lastSeen");
    if (typeof lastSeen === 'undefined' || lastSeen === null) {
      lastSeen = '';
    }
    const decodedString = lastSeen ? decodeURIComponent(lastSeen) : '';

    const lastSeenObj = JSON.parse(decodedString);
    const lastSeenSet: Data = lastSeenObj;

    setInvest(lastSeenSet);
  }, [current, invest, params])

  return (
    <PageBody>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={4}>
            <Box>
              <CardInfo order={1} value={typeof invest?.value === 'undefined' || invest?.value === undefined ? 0 : invest?.value} />

              <CardInfo order={2} value={current}/>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <CardGraph invest={invest} current={current} />
          </Grid>
        </Grid>

        <Card
          sx={{
            width: '100%',
            mt: '32px',
            borderRadius: '16px',
            p: '16px'
          }}
        >
          <History invest={invest} current={current} setCurrent={setCurrent} />
        </Card>
      </Box>
    </PageBody>
  );
}
