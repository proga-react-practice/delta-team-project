import { StyledTableCell } from './StyledTableCell';
import { styled } from '@mui/system';

export const StyledTableCellMobile = styled(StyledTableCell)(({theme}) => ({
  textAlign: 'left',
  border: '0',
  color: theme.palette.text.primary
}));