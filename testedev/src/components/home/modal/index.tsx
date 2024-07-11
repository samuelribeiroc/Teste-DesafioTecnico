import * as React from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Data } from '../table';
import InputNumber from '@/components/templates/inputNumber';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  setRows: React.Dispatch<React.SetStateAction<Data[]>>;
  rows: Data[];
};

dayjs.extend(customParseFormat);

export default function CreateModal({ open, handleClose, setRows, rows }: ModalProps) {
  const [title, setTitle] = React.useState<string>('');
  const [value, setValue] = React.useState<number>(0);
  const [date, setDate] = React.useState<string>(dayjs().format('DD/MM/YYYY'));

  const handleChangeTitle = (event: any) => {
    const newTitle = event.target.value;
    setTitle(newTitle)
  };

  const handleChangeValue = (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && newValue >= 0) {
      setValue(parseFloat(newValue));
    }
  };

  const handleChangeDate = (event: any) => {
    const newDate = event;
    setDate(dayjs(newDate).format('DD/MM/YYYY'));
  };

  const cleanAndClose = () => {
    setTitle('');
    setValue(0);
    setDate(dayjs().format('DD/MM/YYYY'));
    handleClose();
  };

  const handleCreateInvest = () => {
    let newInvest: Data = {
      id: rows.length + 1,
      action: 'visualize',
      name: title,
      value: value,
      date: date,
    };

    let newRows = [...rows, newInvest];
    setRows(newRows);
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <form
        onSubmit={handleCreateInvest}
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
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Investment infos
          </Typography>

          <Box sx={{ width: '100%', mt: '40px' }}>
            <TextField
              label="Investment title"
              value={title}
              onChange={handleChangeTitle}
              placeholder='Title'
              required
              fullWidth
              sx={{ mb: '20px' }}
            />

            <InputNumber value={value} setValue={setValue} />

            <DatePicker
              label='Date'
              value={date}
              onChange={handleChangeDate}
              views={['year', 'month', 'day']}
              format='dd/MM/yyyy'
              disableFuture
              sx={{ width: '100%' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mt: '30px'
            }}
          >
            <Button
              variant='outlined'
              color='error'
              onClick={cleanAndClose}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              type='submit'
              disabled={title === '' || value === 0}
            >
              <Typography fontWeight={500}>
                Create
              </Typography>
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}
