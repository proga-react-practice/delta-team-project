export const createTransform = () => ({
    '@keyframes scaleDown': {
      '0%': {
        transform: 'scaleY(0)',
        transformOrigin: 'top',
        backgroundColor: 'transparent',
      },
      '100%': {
        transform: 'scaleY(1)',
        transformOrigin: 'top',
        backgroundColor: "background.default",
      },
    },
    animation: 'scaleDown 1.3s ease-in-out',
});