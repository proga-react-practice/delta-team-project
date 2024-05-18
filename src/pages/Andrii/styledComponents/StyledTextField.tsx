import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  borderColor: theme.palette.primary.main,
  fontSize: '16px',
  color: theme.palette.primary.dark,
  boxSizing: 'border-box',
  '&.Mui-error': {
      borderColor: theme.palette.error.main,
  },
}));