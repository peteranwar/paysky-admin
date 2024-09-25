export const productCardStyle = {
    position: 'relative',
    boxShadow: '0px 5px 10px 0 #0000000A',
    borderRadius: { xs: '16px', md: '20px' },
    overflow: 'hidden',
};

export const productImgStyle = {
    height: { xs: '200px', md: '250px' },
    position: 'relative',
    '&::after': {
        content: "''",
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        bgcolor: '#6463634f'
    }
};

const productInfoStyle = {
    '-webkit-box-orient': 'vertical',
    'display': '-webkit-box',
    'overflow': 'hidden',
};

export const productTitleStyle = {
    ...productInfoStyle,
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'all 0.4s ease',
    '-webkit-line-clamp': '2',
    height: '50px',
    '&:hover': {
        color: 'primary.main',
    }
};

export const productDescriptionStyle = {
    ...productInfoStyle,
    '-webkit-line-clamp': {xs:'auto', md: '3'},
    minHeight: {xs: 'auto', md: '70px'},
};