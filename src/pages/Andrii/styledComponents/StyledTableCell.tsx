import { TableCell, tableCellClasses } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTableCell = styled(TableCell)(({theme}) => ({
    fontSize: 16,
    textAlign: 'center',
    color: theme.palette.primary.light,
    borderBottom: '1px solid #ddd',
    
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.light,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));