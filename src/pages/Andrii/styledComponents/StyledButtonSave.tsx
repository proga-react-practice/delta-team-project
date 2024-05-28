import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledButtonSave = styled(Button)(({theme}) => ({
  width: '100%',
  backgroundColor: theme.palette.success.main,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));