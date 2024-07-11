import * as React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import InputNumber from '@/components/templates/inputNumber';
import { Data } from '@/components/home/table';
import dayjs from 'dayjs';

interface withdraw {
  date: string;
  value: number;
};

interface Props {
  invest: Data | null;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>
}

export default function History({ invest, current, setCurrent }: Props) {
  const [withdraws, setWithdraws] = React.useState<withdraw[]>([
    {date: '10/06/2024', value: 12},
    {date: '10/06/2024', value: 7.5},
  ]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);
  const [tax, setTax] = React.useState('');

  React.useEffect(() => {
    const years = Math.floor(dayjs().diff(dayjs(invest?.date, 'DD/MM/YYYY'), 'year', true));

    if (years < 1) {
      setTax('22.5');
    } else if (years === 1 || years === 2) {
      setTax('18.5');
    } else {
      setTax('15')
    }
  }, [invest?.date]);

  const handleWithdraw = () => {
    var newCurrent

    if (tax === '22.5') {
      newCurrent = current - (0.225 * current) - value;
    } else if (tax === '18.5') {
      newCurrent = current - (0.185 * current) - value;
    } else {
      newCurrent = current - (0.15 * current) - value;
    }

    setCurrent(newCurrent);

    const today = dayjs().format('DD/MM/YYYY');
    setWithdraws([...withdraws, { date: today, value: value}]);
    handleClose;
  }

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { sm: 400, xs: '90dvw'},
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant='h5' mb='30px'>
            Enter the amount
          </Typography>

          <Typography variant='subtitle2' color='primary'>
            * The interest charged on this withdrawal will be: {tax}%
          </Typography>

          <InputNumber value={value} setValue={setValue} current={current} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: '10px' }}>
            <Button
              color='error'
              variant='outlined'
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              disabled={value === 0 || value > current}
              variant='contained'
              onClick={handleWithdraw}
            >
              Withdraw
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant='h6'>
          Withdrawal history
        </Typography>

        <Button variant='contained' onClick={handleOpen}>
          Withdraw
        </Button>
      </Box>

      <Box
        sx={{
          bgcolor: '#121212',
          width: '100%',
          borderRadius: '8px',
          mt: '16px',
          p: '16px 16px 8px'
        }}
      >
        {withdraws.map((item, index) => (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '3fr 1fr',
              mb: '8px'
            }}
            key={index}
          >
            <Typography>
              {item.date}
            </Typography>
            <Typography>
              R$ {item.value.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
};