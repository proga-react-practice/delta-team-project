import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledButton = styled(Button)(({theme}) => ({
  width: '100%',
  backgroundColor: theme.palette.error.light,
  color: theme.palette.secondary.light,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));