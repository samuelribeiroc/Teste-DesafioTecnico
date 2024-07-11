import * as React from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateModal({ open, handleClose}: ModalProps) {
  const [title, setTitle] = React.useState('');
  const [value, setValue] = React.useState(0);
  const [date, setDate] = React.useState<Date | null>(null);

  const handleChangeTitle = (event: any) => {
    const newTitle = event.target.value;
    setTitle(newTitle)
  }

  const handleChangeValue = (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && newValue >= 0) {
      setValue(parseFloat(newValue));
    }
  };

  const handleBlur = () => {
    setValue(value);
  };

  const handleFocus = () => {
    setValue(value);
  };

  const handleKeyDown = (event: any) => {
    if (['e', 'E', '+', '-', '.'].includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleChangeDate = (event: any) => {
    const newDate = event;
    setDate(newDate);
  }

  const cleanAndClose = () => {
    setTitle('');
    setValue(0);
    setDate(null);
    handleClose();
  }

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { sm: 400, xs: '90dvw'},
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
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
          <TextField
            label="Initial value"
            type="number"
            value={value}
            onChange={handleChangeValue}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: '0', step: "0.01" }}
            placeholder={`0,00`}
            required
            fullWidth
            sx={{ mb: '20px' }}
          />
          <DatePicker
            label='Date'
            defaultValue={null}
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
          <Button variant='contained'>
            <Typography fontWeight={500}>
              Create
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
