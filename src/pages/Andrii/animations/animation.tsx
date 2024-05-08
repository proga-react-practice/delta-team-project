import { Theme } from '@mui/material/styles'

export const createTransform = (theme: Theme) => ({
    '@keyframes scaleDown': {
      '0%': {
        transform: 'scaleY(0)',
        transformOrigin: 'top',
        backgroundColor: 'transparent',
      },
      '100%': {
        transform: 'scaleY(1)',
        transformOrigin: 'top',
        backgroundColor: theme.palette.background.default,
      },
    },
    animation: 'scaleDown 1.3s ease-in-out',
});