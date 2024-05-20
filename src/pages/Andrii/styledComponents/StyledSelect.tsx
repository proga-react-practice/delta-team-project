import { Select } from '@mui/material';
import { styled } from '@mui/system';

export const StyledSelect = styled(Select)(({ theme }) => ({
  width: '92%',
  margin: '10px',
  borderRadius: '5px',
  borderColor: theme.palette.primary.main,
  fontSize: '16px',
  color: theme.palette.primary.dark,
  boxSizing: 'border-box',
  '&.Mui-error': {
      borderColor: theme.palette.error.main,
  },
}));