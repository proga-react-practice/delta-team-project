import { TableCell, tableCellClasses } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTableCell = styled(TableCell)(({theme}) => ({
    fontSize: 16,
    textAlign: 'center',
    color: theme.palette.text.primary,
    borderBottom: '1px solid #93B1A6',
    
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.orders.main,
      color: theme.palette.orders.dark,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));