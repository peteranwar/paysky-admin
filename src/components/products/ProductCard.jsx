import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

// Material UI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import StarRateIcon from '@mui/icons-material/StarRate';

import ImageMain from '../shared/ImageMain';
import { productCardStyle, productDescriptionStyle, productImgStyle, productTitleStyle } from './styles';

const ProductCard = ({ product }) => {
    const { title, price, image, description, rating, category, id } = product;

    return (
        <Box sx={productCardStyle}>
            {/* Header */}
            <Box sx={{
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2, padding: 1.5,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                {/* Rate */}
                <Box py={.2} color='#FFA944' alignItems='center' px={1} display='flex'
                    sx={{ bgcolor: 'common.white', borderRadius: '38px', gap: .3 }}>
                    <StarRateIcon sx={{ fontSize: 18 }} />
                    <Typography variant="caption" fontWeight={600}>
                        {rating.rate}
                    </Typography>
                </Box>

                {/* Category */}
                <Box component={Typography} variant='caption' color='primary.main' alignItems='center' display='flex' justifyContent='center'
                    sx={{ bgcolor: 'common.white', borderRadius: '12px', px: 1, py: .2, fontWeight: 600 }}>
                    {category?.toUpperCase()}
                </Box>
            </Box>

            {/* Product Image */}
            <Box sx={productImgStyle}>
                <ImageMain srcUrl={image}
                    sx={{ objectFit: 'cover', width: '100%', height: '100%', position: 'relative' }} alt={title} />
            </Box>

            {/* Product Details */}
            <Box py={{ xs: 1.75, md: 2.2 }} px={{ xs: .5, md: 1 }}>
                <Typography color='text.primary'
                    component={Link} to={`${id}`}
                    variant='body1'
                    sx={productTitleStyle}
                    mb={{ xs: 1, md: 1.5 }}
                >
                    {title}
                </Typography>

                <Typography color='text.primary'
                    variant='body2'
                    sx={productDescriptionStyle}
                >
                    {description}
                </Typography>

                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    {/* Price */}
                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: .75 }} variant='h6' color='primary.main' fontWeight={500} my={{ xs: 1, md: 1.5 }}>
                        {price?.toFixed(1)}  <Typography variant='body2' component='span' color='text.light2' >
                            /EGP
                        </Typography>
                    </Typography>
                    <Button variant='contained' size='small' component={Link} to={`${id}`} sx={{
                        px: { xs: 2, md: 4 },
                        '&:hover': {
                            color: 'common.white'
                        }
                    }}>
                        View
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
ProductCard.propsTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}
export default ProductCard