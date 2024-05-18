import { TableRow } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '@keyframes scaleDown': {
    '0%': {
      transform: 'scaleY(0)',
      transformOrigin: 'top',
      backgroundColor: 'transparent',
    },
    '100%': {
      transform: 'scaleY(1)',
      transformOrigin: 'top',
      backgroundColor: theme.palette.background.default,
    },
  },
  animation: 'scaleDown 1s ease-in-out',
}));