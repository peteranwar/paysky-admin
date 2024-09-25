// Material UI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

import { productCardStyle, productDescriptionStyle, productImgStyle } from './styles';


const ProductCardLoading = () => {

    return (
        <Box sx={productCardStyle}>
            {/* Header */}
            <Box sx={{
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2, padding: 1.5,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                {/* Rate */}
                <Skeleton sx={{ borderRadius: '12px', px: 1, py: .2, fontWeight: 600 }} animation='wave' variant='rectangular' width='70px' height='20px' />


                {/* Category */}
                <Skeleton sx={{ borderRadius: '12px', px: 1, py: .2, fontWeight: 600 }} animation='wave' variant='rectangular' width='100px' height='20px' />
            </Box>

            {/* Product Image */}
            <Box sx={productImgStyle}>
                <Skeleton animation='wave' variant='rectangular' width='100%' height='100%' />
            </Box>

            {/* Product Details */}
            <Box py={{ xs: 1.75, md: 2.2 }} px={{ xs: .5, md: 1 }}>
                <Typography
                    variant='body1'
                    mb={{ xs: 1, md: 1.5 }}
                >
                    <Skeleton sx={{ mb: 1 }} animation='wave' variant='rounded' width='95%' height='16px' />
                    <Skeleton sx={{ mb: 1 }} animation='wave' variant='rounded' width='70%' height='16px' />
                </Typography>

                <Typography color='text.primary'
                    variant='body2'
                    sx={productDescriptionStyle}
                >
                    <Skeleton sx={{ mb: 1 }} animation='wave' variant='rectangular' width='95%' height='7px' />
                    <Skeleton sx={{ mb: 1 }} animation='wave' variant='rectangular' width='70%' height='7px' />
                    <Skeleton sx={{ mb: 1 }} animation='wave' variant='rectangular' width='80%' height='7px' />
                </Typography>

                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    {/* Price */}
                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: .75 }} variant='h6' color='primary.main' fontWeight={500} my={{ xs: 1, md: 1.5 }}>
                        <Skeleton sx={{ mb: 1 }} animation='wave' variant='rounded' width='70px' height='20px' />
                    </Typography>
                    <Skeleton sx={{ mb: 1 }} animation='wave' variant='rounded' width='100px' height='40px' />
                </Box>
            </Box>
        </Box>
    )
}

export default ProductCardLoading