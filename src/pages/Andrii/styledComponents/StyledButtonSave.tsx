import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledButtonSave = styled(Button)(({theme}) => ({
  width: '100%',
  backgroundColor: theme.palette.success.light,
  color: theme.palette.secondary.light,
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));