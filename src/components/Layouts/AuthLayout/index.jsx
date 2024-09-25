import PropTypes from 'prop-types';

import Container from "@mui/material/Container";

import ImageMain from "../../shared/ImageMain"

const AuthLayout = ({ children }) => {
    return (
        <Container>
            <ImageMain
                name='Paysky-logo.png'
                alt='Paysky logo'
                width={200}
                height={65}
                sx={{ objectFit: 'contain' }}
            />
            {children}
        </Container>
    )
}

AuthLayout.propTypes = {
    children: PropTypes.node,
  };

export default AuthLayout