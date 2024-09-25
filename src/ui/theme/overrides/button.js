// const CUBIC_BEZIER_TRANSITION = '1.000, 0.000, 0.000, 1.000';
const Button = (theme) => {
  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: {
            variant: 'secondary',
          },
          style: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            '&:hover': {
              backgroundColor: theme.palette.secondary.main,
              filter: 'brightness(0.85)',
            },
          },
        },
        {
          props: {
            variant: 'darkGrey',
          },
          style: {
            backgroundColor: theme.palette.darkGrey.main,
            color: theme.palette.darkGrey.main,
            '&:hover': {
              backgroundColor: theme.palette.darkGrey.main,
              filter: 'brightness(0.85)',
            },
          },
        },
        {
          props: {
            variant: 'lightGrey',
          },
          style: {
            backgroundColor: theme.palette.lightGrey.main,
            color: theme.palette.darkGrey.main,
            '&:hover': {
              backgroundColor: theme.palette.lightGrey.main,
              filter: 'brightness(0.85)',
            },
          },
        },
        {
          props: {
            variant: 'outlined',
          },
          style: {
            fontFamily: theme.palette.typography.font.bold,
            position: 'relative',
            overflow: 'hidden',
            zIndex: '20',
            transition: `all 0.4s ease`,
            borderRadius: '16px',
            borderColor: 'currentColor',
            color: theme.palette.primary.main,
            minHeight: '50px',
            fontSize: '20px',
            [theme.breakpoints.down('md')]: {
              minHeight: '44px',
              fontSize: '15px',
            },
            '&.MuiButton-sizeSmall': {
              fontSize: '16px !important',
              minHeight: '46px',
              borderRadius: '14px',
              [theme.breakpoints.down('md')]: {
                minHeight: '40px',
                fontSize: '14px',
                borderRadius: '12px',
              },
            },
            ':hover': {
              backgroundColor: theme.palette.common.white,
              color: theme.palette.primary.main,
              borderColor: theme.palette.common.white,
              boxShadow: '0px 0px 9px 0px #cdcaca74'
            },
            '&:active': {
              backgroundColor: theme.palette.action.active,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          // paddingTop: '4px',
          // paddingBottom: '4px',

          '&:hover': {
            boxShadow: 'none',
          },
          '&.MuiSwitch-switchBase': {
            backgroundColor: 'red',
            color: 'blue',
          },
          '.MuiSwitch-switchBase': {
            backgroundColor: 'red',
            color: 'blue',
          },
          '&.MuiSwitch-track': {
            backgroundColor: 'red',
            color: 'blue',
          },
          '.MuiSwitch-track': {
            backgroundColor: 'red',
            color: 'blue',
          },
        },
        contained: {
          fontFamily: theme.palette.typography.font.bold,
          borderRadius: '16px',
          minHeight: '50px',
          fontSize: '20px',
          [theme.breakpoints.down('md')]: {
            minHeight: '44px',
            fontSize: '15px',
          },
          '&.MuiButton-sizeSmall': {
            fontSize: '16px !important',
            minHeight: '46px',
            borderRadius: '14px',
            [theme.breakpoints.down('md')]: {
              minHeight: '40px',
              fontSize: '14px',
              borderRadius: '12px',
            },
          },
          '&.Mui-disabled': {
            color: theme.palette.common.white,
          },
          ':hover': {
            backgroundColor: theme.palette.primary.light,
          },
          ':active': {
            backgroundColor: theme.palette.primary.light,
          },
        },
        text: {
          padding: 0,
          color: theme.palette.common.black,
          '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.buttonAction.hover,
          },
          ':active': {
            backgroundColor: 'transparent',
            color: theme.palette.buttonAction.active,
          },
        },
      },
    },
  };
};
export default Button;
