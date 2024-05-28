import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledButtonDelete = styled(Button)(({theme}) => ({
  width: '100%',
  backgroundColor: theme.palette.error.light,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));