import PropTypes from 'prop-types';

import { useNavigate } from "react-router-dom";

// Material UI Components
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductHeader = ({ title }) => {
    const navigate = useNavigate();
    
    if (!title) {
        return;
    }

    return (
        <Box display='flex' alignItems='center' gap={2} mb={4}>
            <Box onClick={() => navigate(-1)} display='flex' alignItems='center' justifyContent='center' sx={{
                border: '1px solid #eee',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                cursor: 'pointer',
                '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'common.white'
                }
            }}>
                <ArrowBackIcon />
            </Box>
            <Typography variant='h1'>
                {title}
            </Typography>
        </Box>
    )
}

ProductHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default ProductHeader