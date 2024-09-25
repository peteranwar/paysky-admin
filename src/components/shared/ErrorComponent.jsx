import PropTypes from 'prop-types';

// Material UI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ErrorComponent = ({ error }) => {
    return (
        <Box textAlign='center' my={{ xs: 4, md: 5 }}>
            <Typography variant="h6" color='error'>{error ?? 'Something went wrong...'}</Typography>
        </Box>
    )
}

ErrorComponent.propTypes = {
    error: PropTypes.string,
};

export default ErrorComponent