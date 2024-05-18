import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledButtonEdit = styled(Button)(({theme}) => ({
  width: '100%',
  backgroundColor: theme.palette.info.light,
  color: theme.palette.secondary.light,
  '&:hover': {
    backgroundColor: theme.palette.info.dark,
  },
}));