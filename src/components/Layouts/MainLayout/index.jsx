import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Material UI Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMediaQuery, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import ImageMain from '../../shared/ImageMain';

import { addUserData, logOut } from '../../../redux/reducer/user.reducer';
import { ProfileMenu } from './ProfileMenu';
import { userIconStyle } from './styles';

const drawerWidth = 240;

function MainLayout(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('md'));

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const isProfileMenuOpen = Boolean(profileAnchorEl);

  // Get User Data from Local Storage 
  const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleMenuClose = () => {
    setProfileAnchorEl(null);
  };
  const handleProfileMenuOpen = event => {
    setProfileAnchorEl(event.currentTarget);
  };


  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const navLinks = [
    {
      id: 1,
      url: '/categories',
      icon: <CategoryIcon />,
      text: 'Categories'
    },
    {
      id: 2,
      url: '/products',
      icon: <InboxIcon />,
      text: 'Products'
    },
  ]

  function handleLogout() {
    dispatch(logOut());
    navigate('/login')
  }

  useEffect(() => {
    if (user?.email) {
      dispatch(addUserData({ email: user.email }))
    }
  }, [user, dispatch])

  const drawer = (
    <>
      <Toolbar>
        <Link to='/' onClick={handleDrawerToggle}>
          <ImageMain
            name='Paysky-logo.png'
            alt='Paysky logo'
            width={200}
            height={65}
            sx={{ objectFit: 'contain' }}
          />
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {navLinks.map(link => (
          <ListItem onClick={handleDrawerClose} key={link.id} disablePadding component={Link} to={link.url}>
            <ListItemButton>
              <ListItemIcon>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.text} sx={{ color: 'text.primary' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton >
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary='Log Out' sx={{ color: 'error.main' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          border: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Paysky Admin
          </Typography>
          <Box display='flex' justifyContent='end' alignItems='center' flex={1}>
            <Typography display={{ xs: 'none', md: 'flex' }} variant='body2' color='#adabab' sx={{ mr: 2 }}>
              Welcome:
            </Typography>
            <Typography display={{ xs: 'none', md: 'flex' }} variant='body2' sx={{ color: 'common.white' }}>{user?.email}</Typography>
            <Box onClick={handleProfileMenuOpen} display='flex' justifyContent='center' alignItems='center' sx={userIconStyle}>
              <AccountCircleIcon />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: { sm: `calc(100vw - ${drawerWidth}px)` }, maxWidth: '100vw' }}
      >
        <Toolbar />
        {children}

        {/* ProfileMenu */}
        <ProfileMenu {
          ...{
            mobileView, profileAnchorEl, isProfileMenuOpen, handleMenuClose, handleLogout,
            handleDrawerToggle
          }
        } />
      </Box>
    </Box>
  );
}

MainLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
  children: PropTypes.node,
};

export default MainLayout;