import { TableRow } from '@mui/material';
import { styled } from '@mui/system';
import { createTransform } from '../animations/animation'

const Transform = createTransform();

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  ...Transform,
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));