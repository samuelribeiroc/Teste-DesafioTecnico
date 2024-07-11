import * as React from 'react';
import { InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

interface Props {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  current?: number
}

export default function InputNumber({ value, setValue, current }: Props) {
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

  const handleChangeValue = (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && newValue >= 0) {
      setValue(parseFloat(newValue));
    }
  };

  return (
    <>
      <InputLabel
        htmlFor="outlined-adornment-amount"
        sx={{ bottom: '-10px', left: '12px', fontSize: '12px' }}
      >
        Value *
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        label="Value"
        type="number"
        value={value}
        onChange={handleChangeValue}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
        inputProps={{ min: '0', max: current, step: "0.01" }}
        placeholder={`0,00`}
        required
        fullWidth
        sx={{ mb: '20px' }}
      />
    </>
  );
}