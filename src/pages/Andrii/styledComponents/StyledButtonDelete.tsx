import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledButtonDelete = styled(Button)(({theme}) => ({
  width: '100%',
  color: 'beige',
  backgroundColor: theme.palette.error.light,
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.error.dark,
  },
}));