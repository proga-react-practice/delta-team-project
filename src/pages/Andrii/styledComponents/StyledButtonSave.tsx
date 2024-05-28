import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledButtonSave = styled(Button)(({theme}) => ({
  width: '100%',
  color: 'beige',
  backgroundColor: theme.palette.success.main,
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.success.dark,
  },
}));