import PropTypes from 'prop-types';

import React from 'react';

// Material UI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true, error }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#333'
        }}>
          <Typography variant='h2' color='common.white' mb={2}>Oops, there is an error!</Typography>
          <Button
            type="button"
            variant='contained'
            onClick={() => this.setState({ hasError: false })}
            color='error'
          >
            Try again?
          </Button>
        </Box>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
}
export default ErrorBoundary