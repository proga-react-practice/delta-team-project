import { TableRow } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));