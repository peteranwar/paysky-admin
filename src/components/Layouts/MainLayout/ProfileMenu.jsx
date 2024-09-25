import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

// Material UI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const ProfileMenu = ({ mobileView, profileAnchorEl, isProfileMenuOpen, handleMenuClose, handleLogout,
    handleDrawerToggle }) => {
    const profileId = 'profile-menu';

    return (
        <Menu
            sx={{
                mt: '40px',
                minHeight: '500px',
                zIndex: 99999999,
                '& .MuiPaper-root': {
                    minWidth: { xs: '180px', lg: '220px' },
                    marginInlineStart: !mobileView && '-15px',
                    boxShadow: '0px 34px 140px 0px rgba(182, 185, 212, 0.20)',
                    borderRadius: '10px',
                },
                '& .MuiModal-root': {
                    zIndex: 999,
                }
            }}
            anchorEl={profileAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            id={profileId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={isProfileMenuOpen}
            onClose={handleMenuClose}
        >
            <Box px={1}>

                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        handleDrawerToggle()
                    }}
                    mx={0}
                    sx={{
                        borderBottom: '.6px solid #B6B9D4',
                        padding: '0 !important'
                    }}
                >
                    <Box component={Link} to={`/profile`}
                        width='100%' height='100%' sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', p: { xs: 1, md: 1.5 }, gap: 1 }}>
                        <AccountBoxIcon sx={{ color: 'text.light2' }} />
                        <Typography color='text.light2' variant='caption' fontWeight={500}>
                            My Account
                        </Typography>
                    </Box>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        handleDrawerToggle()
                    }}
                    mx={0}
                    sx={{
                        borderBottom: '.6px solid #B6B9D4',
                        padding: '0 !important'
                    }}
                >
                    <Box component={Link} to={`/profile/setting`}
                        width='100%' height='100%' sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', p: { xs: 1, md: 1.5 }, gap: 1 }}>
                        <ManageAccountsIcon sx={{ color: 'text.light2' }} />
                        <Typography color='text.light2' variant='caption' fontWeight={500}>
                            Setting
                        </Typography>
                    </Box>
                </MenuItem>
                <Box onClick={() => {
                    handleMenuClose();
                    handleLogout();
                    handleDrawerToggle()
                }} mx={0} sx={{ p: { xs: 1, md: 1.5 } }}>
                    <Button variant='contained' fullWidth size='small'>
                        Log out
                    </Button>
                </Box>
            </Box>
        </Menu>
    )
};

ProfileMenu.propTypes = {
    mobileView: PropTypes.bool,
    profileAnchorEl: PropTypes.string,
    isProfileMenuOpen: PropTypes.bool,
    handleMenuClose: PropTypes.func,
    handleLogout: PropTypes.func,
    handleDrawerToggle: PropTypes.func,
  };