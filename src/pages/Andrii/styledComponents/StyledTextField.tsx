import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  boxSizing: 'border-box',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.quaternary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.dark,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.dark,
    },
  },
  '& .MuiFormLabel-root': {
    color: theme.palette.quaternary.dark,
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: theme.palette.secondary.dark,
  },
  '&.Mui-error': {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.error.main,
      },
    },
    '& .MuiFormLabel-root': {
      color: theme.palette.error.main,
    },
  },
}));